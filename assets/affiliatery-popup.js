let settings = {
  isEnabled: false
}


let htmlString = `<html>
<head>

  <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.13.0/css/all.css">
  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  <!-- Optional theme -->
  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
<body>
<div data-server-rendered="true" class="card" style="width:400px;"><img src="https://st2.depositphotos.com/1064024/10769/i/600/depositphotos_107694484-stock-photo-little-boy.jpg" alt="header image" class="card-img-top"> <div class="card-body"><h5 class="card-title">Refer a friend, get a reward!</h5> <p class="card-text"></p> <div class="d-flex justify-content-center"><a href="https://happyeventsurat.affiliatery.staqlab.com/partner/signIn" target="_blank" class="btn btn-primary">SignUp &amp; Get my link</a></div></div> <style>
    .btn-primary{
      font-size: 14px;font-weight: 400;line-height: 1.42857143;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      touch-action: manipulation;
      cursor: pointer;
      user-select: none;
      border: 1px solid transparent;
      padding: 10px 20px;
      margin-bottom: 5px;
      background: #6774c8;
      color: #ffffff;
      border-radius: 3px;
    }
    .card-title{
      text-align: center;
    }

  </style></div>
</body>
</html>
`
let modalObj = `<div id="af-modal" class="af-modal">

  <!-- Modal content -->
  <div class="af-modal-content">
    <span class="close">&times;</span>
    ${htmlString}
  </div>

</div>`

let styles = `/* The Modal (background) */
.af-modal {
  overflow: hidden;
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 100; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  /*overflow: auto; !* Enable scroll if needed *!*/
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.af-modal-content {
  /*background-color: #fefefe;*/
  margin: 10% auto; /* 15% from the top and centered */
  /*padding: 20px;*/
  /*border: 1px solid #888;*/
  width: max-content; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  margin-right: 20px;
  margin-top: -20px;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

`
var styleSheet = document.createElement("style")
styleSheet.type = "text/css"
styleSheet.innerText = styles
document.head.appendChild(styleSheet)

if (settings.isEnabled) {
  document.body.innerHTML = document.body.innerHTML + modalObj
  let modal = document.getElementById("af-modal")
  modal.style.display = "block"
  let close = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
  close.onclick = function () {
    modal.style.display = "none";
  }
}
