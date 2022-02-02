window.affiliateryConfig = {
  apiUrl: "https://affiliatery-api.staqlab.com/affiliatery",
  clientId: "X1JVI2162ZTB2KX15KFRKG8T",
  autoApplyDiscount: false
};

(async function () {
  function isPostPurchasePage() {
    return Shopify && (Shopify.Checkout) && (Shopify.Checkout.page === "thank_you" || Shopify.Checkout.isOrderStatusPage)
  }

  async function getDiscountCode(refCode) {
    try {
      return (await (await fetch(`${affiliateryConfig.apiUrl}/api/discount-code?clientId=${affiliateryConfig.clientId}&refCode=${refCode}`)).json()).discountCode
    } catch (e) {
      console.log(e)
    }
  }

  async function processEvent() {
    try {
      let partnerRefCode = await getPartnerCode()
      if (!partnerRefCode) {
        return
      }
      let key = `affiliatery-user-id`
      let userUniqueId = await getcookie(key)

      let data = {
        userUniqueId: userUniqueId,
        refCode: partnerRefCode,
        clientUniqueId: window.affiliateryConfig.clientId
      }
      userUniqueId = (await (await fetch(`${affiliateryConfig.apiUrl}/api/event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(data)
      })).json()).userUniqueId
      document.cookie = `${key}=${userUniqueId};max-age=31104000;path=/`;
    } catch (e) {
      console.log(e)
    }
  }

  function getPartnerCode() {
    let partnerRefCode = getcookie(`affiliatery-partner-code`)
    if (!partnerRefCode) {
      try {
        let value = window.localStorage.getItem(`affiliatery-partner-code`);
        if (value) {
          let age = value.split(";").find(x => x.includes("created-at"))
          if (age) {
            age = Number(age.split("created-at=")[1].trim())
            let maxAge = Number(value.split(";").find(x => x.includes("max-age")).split("max-age=")[1].trim())
            if ((age + maxAge * 1000) > new Date().valueOf())
              partnerRefCode = value.split("=")[1].split(";")[0];
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
    return partnerRefCode
  }

  function getcookie(name = '') {
    let cookies = document.cookie;
    let cookiestore = {};

    cookies = cookies.split(";");

    if (cookies[0] === "" && cookies[0][0] === undefined) {
      return undefined;
    }

    cookies.forEach(function (cookie) {
      cookie = cookie.split(/=(.+)/);
      if (cookie[0].substr(0, 1) === ' ') {
        cookie[0] = cookie[0].substr(1);
      }
      cookiestore[cookie[0]] = cookie[1];
    });

    return (name !== '' ? cookiestore[name] : cookiestore);
  }

  function processDiscount(code) {
    let params = Object.fromEntries(new URLSearchParams(location.search))
    if (params.ref_cca) {
      return
    }
    params.ref_cca = params.ref;
    delete params.ref;
    try {
      let query = new URLSearchParams(params).toString();
      let url = `https://${window.location.hostname}/discount/${code}?redirect=${location.pathname}${query ? `?${query}` : ''}`;
      window.location.href = url
    } catch (e) {
      console.error("Error", e);
    }
  }

  function queryStringToJSON(qs) {
    qs = qs || location.search.slice(1);

    let pairs = qs.split('&');
    let result = {};
    pairs.forEach(function (p) {
      let pair = p.split('=');
      let key = pair[0];
      let value = decodeURIComponent(pair[1] || '');

      if (result[key]) {
        if (Object.prototype.toString.call(result[key]) === '[object Array]') {
          result[key].push(value);
        } else {
          result[key] = [result[key], value];
        }
      } else {
        result[key] = value;
      }
    });

    return JSON.parse(JSON.stringify(result));
  }

  let queryJson = queryStringToJSON(location.search.slice(1))
  let partnerRefCode = queryJson.ref || queryJson.ref_cca;
  if (partnerRefCode) {
    let string = `affiliatery-partner-code=${partnerRefCode};max-age=2592000;path=/`;
    document.cookie = string
    try {
      window.localStorage.setItem(`affiliatery-partner-code`, string + `;created-at=${new Date().valueOf()}`);
    } catch (e) {
      console.log(e)
    }
    let code = await getDiscountCode(partnerRefCode);
    if (code && affiliateryConfig.autoApplyDiscount)
      processDiscount(code)
  } else
    partnerRefCode = getPartnerCode(`affiliatery-partner-code`)

  console.log(partnerRefCode)

  async function cartMapping() {

    let cartResponse = await fetch(`https://${window.location.host}/cart.js`)
      .then(x => x.json())
      .catch(x => console.log(x.status));

    let mapping = {
      cartToken: (cartResponse && cartResponse.token) || 'NA',
      partnerRefCode: partnerRefCode,
      clientUniqueId: window.affiliateryConfig.clientId
    };
    const url = "https://affiliatery-api.staqlab.com/affiliatery/api/cart-mapping";
    if (cartResponse && cartResponse.token) {
      mapping['cartToken'] = cartResponse.token;
    }

    //if (window.location.href.includes("checkouts")) {
    mapping['checkoutToken'] = Shopify && Shopify.Checkout && Shopify.Checkout.token
    // }
    if (isPostPurchasePage()) {
      mapping["orderStatusUrl"] = window.location.href
    }

    mapping["orderId"] = Shopify.checkout && Shopify.checkout.order_id

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify(mapping)
    });
  }

  // if (partnerRefCode)
  await cartMapping()

  await processEvent()

})();
