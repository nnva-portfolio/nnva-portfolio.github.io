/* Shared light/dark theme. Light by default; a choice is kept only while browsing in this tab.
   Order: sessionStorage (the latest choice) > window.name > ?theme= in the URL (fallback only,
   because an old URL in the history must never override a newer choice). */
(function(){
  var r=document.documentElement;
  function get(){
    var t=null;
    try{t=sessionStorage.getItem('vt-theme')}catch(e){}
    if(t!=='dark'&&t!=='light'){t=null;var n=/theme:(dark|light)/.exec(window.name||'');if(n)t=n[1]}
    if(!t){var m=/[?&]theme=(dark|light)/.exec(location.search);if(m)t=m[1]}
    return t==='dark'?'dark':'light';
  }
  function links(t){
    [].forEach.call(document.querySelectorAll('a[href]'),function(a){
      var h=a.getAttribute('href');
      if(!h||/^(#|mailto:|tel:|https?:|javascript:)/i.test(h))return;
      var p=h.split('#'),b=p[0].replace(/([?&])theme=(dark|light)&?/,'$1').replace(/[?&]$/,'');
      if(!/\.html?(\?|$)/.test(b))return;
      a.setAttribute('href',b+(b.indexOf('?')<0?'?':'&')+'theme='+t+(p[1]?'#'+p[1]:''));
    });
  }
  function save(t){
    try{sessionStorage.setItem('vt-theme',t)}catch(e){}
    try{window.name=(window.name||'').replace(/\s*theme:(dark|light)/g,'')+' theme:'+t}catch(e){}
    /* keep this page's own history entry in step, so Back never brings an old theme */
    try{if(/[?&]theme=(dark|light)/.test(location.search)){
      var q=location.search.replace(/([?&])theme=(dark|light)/,'$1theme='+t);
      history.replaceState(history.state,'',location.pathname+q+location.hash)}}catch(e){}
  }
  function apply(t){r.setAttribute('data-theme',t);save(t);links(t)}
  try{localStorage.removeItem('theme')}catch(e){}
  r.setAttribute('data-theme',get());

  /* smooth switching: cross-fade between pages and between themes, no per-element colour transitions */
  var st=document.createElement('style');
  st.textContent='@view-transition{navigation:auto}'
    +'::view-transition-old(root),::view-transition-new(root){animation-duration:.22s}'
    +'html.tswitch *,html.tswitch *::before,html.tswitch *::after{transition:none!important}'
    +'@media (prefers-reduced-motion:reduce){::view-transition-old(root),::view-transition-new(root){animation:none}}';
  document.head.appendChild(st);

  /* Open another page of the portfolio at its top. In the artifact viewer the page can keep the
     scroll position of the page you came from; a click on an internal link sets a flag in
     window.name, and the next page scrolls itself (and its frame) to the top on load. */
  var nav=/\snavtop/.test(window.name||'');
  if(nav){try{window.name=window.name.replace(/\s*navtop/g,'')}catch(e){}}
  function toTop(){
    if(location.hash)return;
    window.scrollTo(0,0);
    try{document.documentElement.scrollIntoView({block:'start'})}catch(e){}
  }
  if(nav&&!location.hash){
    toTop();
    document.addEventListener('DOMContentLoaded',toTop);
    window.addEventListener('load',function(){toTop();setTimeout(toTop,120)});
  }
  var lj=/\slangjump/.test(window.name||'');
  if(lj){try{window.name=window.name.replace(/\s*langjump/g,'')}catch(e){}
    if(location.hash){r.style.scrollBehavior='auto';
      var jump=function(){var el=document.getElementById(location.hash.slice(1));if(el)el.scrollIntoView({block:'start'})};
      document.addEventListener('DOMContentLoaded',jump);
      window.addEventListener('load',function(){jump();setTimeout(function(){r.style.scrollBehavior=''},300)})}}
  document.addEventListener('click',function(e){
    var la=e.target.closest&&e.target.closest('.lang a[href]');
    if(la){
      var cur=null,y=innerHeight*.35;
      if(window.scrollY>200)[].forEach.call(document.querySelectorAll('header[id],section[id],div.wrap[id],main [id]'),function(s){
        if(s.closest('.lb,.fo,svg'))return;var t=s.getBoundingClientRect().top;if(t<y&&s.offsetHeight>200)cur=s.id});
      var hh=la.getAttribute('href').split('#')[0];
      if(cur){la.setAttribute('href',hh+'#'+cur);try{window.name=(window.name||'').replace(/\s*(langjump|navtop)/g,'')+' langjump'}catch(err){}return}
      la.setAttribute('href',hh);
    }
    var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;
    var h=a.getAttribute('href')||'';
    if(/^(#|mailto:|tel:|https?:|javascript:)/i.test(h)||h.indexOf('#')>-1)return;
    if(!/\.html?(\?|$)/.test(h.split('#')[0]))return;
    try{window.name=(window.name||'').replace(/\s*navtop/g,'')+' navtop'}catch(err){}
  },true);
  /* a page restored by Back/Forward (bfcache) or a tab coming back into view re-reads the latest choice */
  function sync(){var t=get();if(r.getAttribute('data-theme')!==t){r.classList.add('tswitch');apply(t);requestAnimationFrame(function(){requestAnimationFrame(function(){r.classList.remove('tswitch')})})}else links(t)}
  window.addEventListener('pageshow',function(e){if(e.persisted)sync()});
  document.addEventListener('visibilitychange',function(){if(!document.hidden)sync()});
  document.addEventListener('DOMContentLoaded',function(){
    var t=get();apply(t);
    var b=document.getElementById('theme');
    if(b)b.addEventListener('click',function(){
      var n=r.getAttribute('data-theme')==='dark'?'light':'dark';
      function go(){r.classList.add('tswitch');apply(n);requestAnimationFrame(function(){requestAnimationFrame(function(){r.classList.remove('tswitch')})})}
      var calm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
      if(document.startViewTransition&&!calm){try{document.startViewTransition(go);return}catch(e){}}
      go();
    });
  });
})();
