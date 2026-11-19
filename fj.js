/* FigJam chrome for the case study pages: bars, toolbar, cursors, selection box, frame names, before/after. */
(function(){
  var d=document,vi=d.documentElement.lang==='vi';
  var cur='<svg viewBox="0 0 18 18"><path d="M2 2l13 6-6 1.5L6.5 16z" fill="COL" stroke="#fff" stroke-width="1.2"/></svg>';
  function el(h){var t=d.createElement('div');t.innerHTML=h.trim();return t.firstChild}

  /* top-left: "nn Works" goes home; the file pill opens a case-study switcher */
  var cr=d.querySelector('.hero .crumb a'),home0=vi?'about-vi.html':'index.html';
  var cases=[
    {f:'linkadz',n:'01',k:vi?'Web app SaaS':'SaaS web app',t:'LinkAdz',c:'#FF8A3D'},
    {f:'yumzy',n:'02',k:vi?'App di động':'Mobile app',t:'YUMZY',c:'#9fe3b7'},
    {f:'designathon',n:'03',k:vi?'Cuộc thi 24 giờ':'24-hour competition',t:'Designathon 2025',c:'#FFB63C'}];
  var page=(location.pathname.split('/').pop()||'').replace(/-vi\.html$|\.html$/,'');
  var chev='<svg class="chev" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 6l3 3 3-3"/></svg>';
  var arr='<svg class="ar" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 8h9M9 4.5L12.5 8 9 11.5"/></svg>';
  var items=cases.map(function(c,i){var on=c.f===page||(!page&&i===0);
    return '<a role="menuitem" class="fj-cs'+(on?' on':'')+'" href="'+c.f+(vi?'-vi':'')+'.html"'+(on?' aria-current="page"':'')+' style="--cc:'+c.c+'">'+
      '<span class="dot"></span><span class="tx"><b>'+c.t+'</b><small>'+c.k+'</small></span>'+
      (on?'<span class="here">'+(vi?'Đang xem':'Viewing')+'</span>':arr)+'</a>'}).join('');
  var tl=el('<div class="fj-bar tl"><a class="it nn-hover" href="'+home0+'" aria-label="'+(vi?'Về trang chủ':'Back to home')+'"><span class="nnlogo" data-v="nn"></span>'+(cr?cr.textContent:(vi?'Dự án':'Works'))+'</a><span class="sep"></span>'+
    '<div class="fj-sw"><button type="button" class="it f2" aria-haspopup="menu" aria-expanded="false"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="2" width="10" height="12" rx="2"/><path d="M6 6h4M6 9h4"/></svg><span class="fn">'+(d.body.dataset.file||'linkadz · case study 01')+'</span>'+chev+'</button>'+
    '<div class="fj-pop" role="menu" aria-label="'+(vi?'Chọn case study':'Switch case study')+'"><p class="hd"><span>'+(vi?'Case study':'Case studies')+'</span></p>'+items+'</div></div></div>');
  d.body.appendChild(tl);if(window.nnLogoFill)nnLogoFill(tl);
  (function(){
    var sw=tl.querySelector('.fj-sw'),btn=sw.querySelector('button'),pop=sw.querySelector('.fj-pop'),t=null,pinned=false;
    var hov=window.matchMedia&&matchMedia('(hover:hover) and (pointer:fine)').matches;
    function open(){clearTimeout(t);sw.classList.add('open');btn.setAttribute('aria-expanded','true')}
    function close(){clearTimeout(t);pinned=false;sw.classList.remove('open');btn.setAttribute('aria-expanded','false')}
    if(hov){sw.addEventListener('mouseenter',open);sw.addEventListener('mouseleave',function(){if(!pinned)t=setTimeout(close,180)})}
    btn.addEventListener('click',function(e){e.preventDefault();
      if(sw.classList.contains('open')&&(pinned||!hov))close();else{open();pinned=true}});
    d.addEventListener('click',function(e){if(!sw.contains(e.target))close()});
    d.addEventListener('keydown',function(e){if(!sw.classList.contains('open'))return;
      var as=[].slice.call(pop.querySelectorAll('a')),i=as.indexOf(d.activeElement);
      if(e.key==='Escape'){close();btn.focus()}
      else if(e.key==='ArrowDown'){e.preventDefault();as[(i+1)%as.length].focus()}
      else if(e.key==='ArrowUp'){e.preventDefault();as[(i-1+as.length)%as.length].focus()}});
    btn.addEventListener('keydown',function(e){if(e.key==='ArrowDown'){e.preventDefault();open();pinned=true;pop.querySelector('a').focus()}});
    sw.addEventListener('focusout',function(e){if(!sw.contains(e.relatedTarget))close()});
  })();

  /* top-right: language, theme, contact */
  var home=vi?'about-vi.html':'index.html';
  var tr=el('<div class="fj-bar tr"></div>');
  var lang=d.querySelector('nav.top .lang'),mode=d.getElementById('theme');
  if(lang)tr.appendChild(lang);if(mode)tr.appendChild(mode);
  tr.appendChild(el('<a class="fj-cta" href="'+home+'#connect">'+(vi?'liên hệ':'say hi')+'</a>'));
  d.body.appendChild(tr);

  /* bottom toolbar from the on-this-page list */
  var icons=[
    '<path d="M3 7V4h3M21 7V4h-3M3 17v3h3M21 17v3h-3"/><rect x="8" y="8" width="8" height="8" rx="1"/>',
    '<path d="M12 3.5L2.5 20h19z"/><path d="M12 10v5M12 17.6v.4"/>',
    '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
    '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l5 5"/>',
    '<rect x="3" y="4" width="7" height="6" rx="1.5"/><rect x="14" y="14" width="7" height="6" rx="1.5"/><path d="M10 7h4a3 3 0 0 1 3 3v4"/>',
    '<path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3"/><path d="M18 3v4h-4M6 21v-4h4"/>',
    '<rect x="2" y="4" width="14" height="10" rx="1.5"/><path d="M6 18h6M9 14v4"/><rect x="18" y="8" width="4" height="10" rx="1"/>',
    '<path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/>',
    '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
    '<path d="M12 19l7-7 3 3-7 7z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18z"/><path d="M2 2l7.6 7.6"/><circle cx="11" cy="11" r="2"/>',
    '<rect x="6.5" y="2" width="11" height="20" rx="2.5"/><path d="M11 18h2"/>',
    '<path d="M3 10.5v3h3.5l6 4.5v-12l-6 4.5z"/><path d="M16 9a3.5 3.5 0 0 1 0 6M18.8 6.3a7.5 7.5 0 0 1 0 11.4"/>',
    '<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>'];
  var links=[].slice.call(d.querySelectorAll('nav.toc .toc-list a'));
  var tools=el('<nav class="fj-tools" aria-label="'+(vi?'Trong trang này':'On this page')+'"></nav>');
  var tip=el('<div class="fj-tip"></div>');d.body.appendChild(tip);
  links.forEach(function(a,i){
    var b=el('<a href="'+a.getAttribute('href')+'" aria-label="'+a.textContent+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+(icons[a.dataset.ic]||icons[i]||icons[0])+'</svg></a>');
    b.addEventListener('mouseenter',function(){var r=b.getBoundingClientRect();tip.textContent=a.textContent;tip.style.left=(r.left+r.width/2)+'px';tip.style.top=(r.top-32)+'px';tip.classList.add('show')});
    b.addEventListener('mouseleave',function(){tip.classList.remove('show')});
    tools.appendChild(b)});
  d.body.appendChild(tools);
  var tl2=[].slice.call(tools.querySelectorAll('a'));
  function spy(){var y=innerHeight*.4,c=null;tl2.forEach(function(a){var s=d.querySelector(a.getAttribute('href'));if(s&&s.getBoundingClientRect().top<y)c=a});
    tl2.forEach(function(a){a.classList.toggle('on',a===c)})}
  addEventListener('scroll',spy,{passive:true});spy();

  /* hero: selection box around the accent word + collaborator cursors */
  var em=d.querySelector('.hero h1 em');
  if(em){var s=d.createElement('span');s.className='fj-sel';s.innerHTML='<i></i><i></i><i></i><i></i>';em.parentNode.insertBefore(s,em);s.appendChild(em);s.appendChild(el('<span class="dim">'+(d.body.dataset.sel||'4 → 6')+'</span>'))}
  var dds=d.querySelectorAll('.hero .meta dd'),names=d.body.dataset.cursors?d.body.dataset.cursors.split('|'):(dds[1]?dds[1].textContent.split(/,\s*/):[]);
  var hw=d.querySelector('.hero .wide'),cols=['#0d99ff','#14ae5c','#e0a400','#ff24bd','#9747ff'],
      pos=['left:-150px;top:40px','right:-130px;top:10px','left:-120px;top:260px','right:-150px;top:240px'];
  if(hw)names.slice(0,4).forEach(function(n,i){hw.appendChild(el('<div class="fj-cur hs" style="'+pos[i]+'">'+cur.replace('COL',cols[i])+'<b style="background:'+cols[i]+'">'+n+'</b></div>'))});

  /* "pick a term" becomes a cursor */
  [].forEach.call(d.querySelectorAll('.tablebox .hand'),function(h){var t=h.textContent.trim();h.innerHTML=cur.replace('COL','#9747ff')+'<b>'+t+'</b>'});

  /* frame names above the big blocks, named after their section */
  var hash='<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 1v10M9 1v10M1 3h10M1 9h10"/></svg>';
  [].forEach.call(d.querySelectorAll('.layers,.goals,.tablebox,.bars'),function(b){
    var sec=b.closest('section');if(!sec)return;var a=d.querySelector('nav.toc .toc-list a[href="#'+sec.id+'"]');
    b.parentNode.insertBefore(el('<p class="fj-fname">'+hash+(b.dataset.fname||(a?a.textContent:sec.id))+'</p>'),b)});

  /* before / after toggles */
  [].forEach.call(d.querySelectorAll('.ba'),function(ba){
    var seg=ba.querySelector('.ba-seg');seg.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
      [].forEach.call(seg.children,function(x){x.classList.toggle('on',x===b)});
      [].forEach.call(ba.querySelectorAll('.ba-view'),function(v){v.hidden=v.dataset.v!==b.dataset.v})})});

  /* per-card before/after on screen strips */
  d.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.sf-seg button');if(!b)return;
    var sf=b.closest('.sf');[].forEach.call(sf.querySelectorAll('.sf-seg button'),function(x){x.classList.toggle('on',x===b)});
    [].forEach.call(sf.querySelectorAll('.sf-v'),function(v){v.hidden=v.dataset.v!==b.dataset.v})});
})();

/* Mouse wheel over a screen strip scrolls it sideways. At either end the wheel goes back to the page. */
(function(){
  var d=document,st=new WeakMap(),calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  d.addEventListener('wheel',function(e){
    if(e.ctrlKey||e.defaultPrevented)return;
    var el=e.target.closest&&e.target.closest('.strip');if(!el)return;
    var max=el.scrollWidth-el.clientWidth;if(max<=2)return;
    var dy=e.deltaY;if(Math.abs(e.deltaX)>=Math.abs(dy))return;
    if(e.deltaMode===1)dy*=16;else if(e.deltaMode===2)dy*=el.clientWidth;
    var s=st.get(el);if(!s){s={t:0,raf:0,timer:0};st.set(el,s)}
    if(!s.raf)s.t=el.scrollLeft;
    if(!s.raf&&((dy<0&&el.scrollLeft<=0)||(dy>0&&el.scrollLeft>=max-1)))return;
    e.preventDefault();
    s.t=Math.max(0,Math.min(max,s.t+dy));
    el.style.scrollSnapType='none';
    clearTimeout(s.timer);s.timer=setTimeout(function(){el.style.scrollSnapType=''},200);
    if(calm){el.scrollLeft=s.t;return}
    if(s.raf)return;
    (function tick(){
      var diff=s.t-el.scrollLeft;
      if(Math.abs(diff)<1){el.scrollLeft=s.t;s.raf=0;return}
      var step=diff*0.2;if(Math.abs(step)<1)step=diff>0?1:-1;
      el.scrollLeft+=step;s.raf=requestAnimationFrame(tick);
    })();
  },{passive:false});
})();

/* Touch screens have no hover: reword the file-tree hint in the LinkAdz steps. */
(function(){
  if(!(window.matchMedia&&matchMedia('(pointer:coarse)').matches))return;
  var h=document.querySelector('.sthint');if(!h)return;
  h.textContent=document.documentElement.lang==='vi'?'Chạm vào một file để mở step đó.':'Tap a file to open that step.';
})();
