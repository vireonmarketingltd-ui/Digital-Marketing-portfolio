/* Contact form — Web3Forms integration */
var ACCESS_KEY = '98d7de68-0398-4938-981b-f7a158d8c225';

var rules = {
  name:    function(v){ return !v ? 'Name is required.' : v.length < 2 ? 'At least 2 characters.' : null; },
  email:   function(v){ return !v ? 'Email is required.' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Enter a valid email address.' : null; },
  phone:   function(v){ if(!v) return null; var d=v.replace(/[\s\-\+\(\)]/g,''); return !/^\d+$/.test(d) ? 'Digits only please.' : null; },
  service: function(v){ return !v ? 'Please select a service.' : null; },
  message: function(v){ return !v ? 'Message is required.' : v.length < 10 ? 'At least 10 characters.' : null; }
};

function fld(n){ return document.getElementById('f-'+n); }
function grp(n){ var f=fld(n); return f ? f.closest('.fg') : null; }
function errEl(n){ var g=grp(n); return g ? g.querySelector('.err-msg') : null; }
function showErr(n,m){ var g=grp(n),e=errEl(n); if(g) g.classList.add('error'); if(e){e.textContent='⚠ '+m; e.classList.add('show');} }
function clrErr(n){ var g=grp(n),e=errEl(n); if(g) g.classList.remove('error'); if(e) e.classList.remove('show'); }
function vld(n){ var f=fld(n); if(!f) return true; var err=rules[n]?rules[n](f.value.trim()):null; if(err){showErr(n,err);return false;} clrErr(n);return true; }

document.addEventListener('DOMContentLoaded', function(){
  var fields = ['name','email','phone','service','message'];

  fields.forEach(function(n){
    var f=fld(n); if(!f) return;
    f.addEventListener('blur', function(){ vld(n); });
    f.addEventListener('input', function(){ if(grp(n)&&grp(n).classList.contains('error')) vld(n); });
  });

  var form    = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');
  var btn     = document.getElementById('submitBtn');
  if(!form) return;

  form.addEventListener('submit', function(e){
    e.preventDefault();

    var ok = true;
    fields.forEach(function(n){ if(!vld(n)) ok=false; });
    if(!ok){
      for(var i=0;i<fields.length;i++){
        var g=grp(fields[i]);
        if(g&&g.classList.contains('error')){ fld(fields[i]).focus(); break; }
      }
      return;
    }

    if(btn){ btn.textContent='Sending…'; btn.disabled=true; btn.style.opacity='.7'; }

    var data = {
      access_key: ACCESS_KEY,
      name:    fld('name').value.trim(),
      email:   fld('email').value.trim(),
      phone:   fld('phone').value.trim(),
      service: fld('service').value,
      message: fld('message').value.trim(),
      subject: 'New Enquiry — Isaiah Jr. Portfolio'
    };

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(function(res){ return res.json(); })
    .then(function(res){
      if(res.success){
        form.style.display = 'none';
        if(success) success.classList.add('show');
      } else {
        if(btn){ btn.textContent='Send Message →'; btn.disabled=false; btn.style.opacity='1'; }
        alert('Something went wrong. Please try again or DM me on Instagram.');
      }
    })
    .catch(function(){
      if(btn){ btn.textContent='Send Message →'; btn.disabled=false; btn.style.opacity='1'; }
      alert('Network error. Please try again or DM me on Instagram.');
    });
  });

  var reset = document.getElementById('resetForm');
  if(reset){
    reset.addEventListener('click', function(){
      form.reset();
      form.style.display = 'block';
      if(success) success.classList.remove('show');
      if(btn){ btn.textContent='Send Message →'; btn.disabled=false; btn.style.opacity='1'; }
      fields.forEach(clrErr);
    });
  }

  var ph = fld('phone');
  if(ph) ph.addEventListener('keypress', function(e){
    if(!/[\d\s\+\-\(\)]/.test(e.key)&&!e.ctrlKey&&!e.metaKey) e.preventDefault();
  });
});
