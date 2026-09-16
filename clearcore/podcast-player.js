(() => {
  const episodes = [
    ['73voyV4WuXvPvP45S9cjH4','Remember the Sabbath','BibleProject','sabbath · bible'],
    ['1ncaSOwNa3FXWfTr0mCxW6','Be Family Around a Table','Practicing the Way','community · formation'],
    ['1GzCbF3gDRcLQS6lklE9MT','John Mark Comer on Spiritual Formation','That Sounds Fun','formation · discipleship'],
    ['4JZ7s2SHyxMU7IAZZBxpNF','No Accidental Saints: Spiritual Formation','The Intentional Parents Podcast','formation · habits'],
    ['0V6KWGhJ2f6XOh9mzSmLDM','When God Seems Distant','Think Biblically','faith · perseverance'],
    ['7frii3CB4Hily2vF6UdRWq','How Did the Fig Tree Wither So Quickly?','Practicing the Way','fruitfulness · formation'],
    ['29yW4Ds8vnn0jaSbIQe9ZV','What Does It Mean To Be Human?','Practicing the Way','identity · formation'],
    ['4VXwLxTYUU6l4B3tmYY2hy','Jesus on Becoming a Non-Anxious Presence','Practicing the Way','anxiety · jesus'],
    ['7mSMDJhQRGlu2mesO3h0AK','Three Shifts of Discipleship','Practicing the Way','discipleship · hope'],
    ['6SvYHTIyzpXLpP1AqgsKnm','Spiritual Formation & Motherhood','The Intentional Parents Podcast','formation · family'],
    ['6j4UuPCHNLVI2hwVfzV4Vg','How Does Jesus Teach Us to Pray?','BibleProject','prayer · bible'],
    ['3bbPnwWfBVZaiSYGEXipBs','A Conversation with Ronald Rolheiser and John Mark Comer','The Contemplative Pastor','discipleship · formation'],
    ['5XlSmTWMjdGj3CN9WDpban','Ronald Rolheiser on Giving Your Life Away','Practicing the Way','discipleship · service'],
    ['4vk651hpycoLUhy4A0nodg','John Mark Comer on Modern Discipleship','Carey Nieuwhof Leadership Podcast','discipleship · church'],
    ['6IHWKixejO8FGpqpJmyGxE','Lord of the Sabbath','BibleProject','sabbath · bible'],
    ['35NcKUKpbsblsqgJX27VOR','The Cathedral in Time','BibleProject','sabbath · rest'],
    ['56zHb0zSGa36fbGhWrVBBh','Prayer and Spiritual Formation','For the Beauty','prayer · formation'],
    ['7cBeWxkVxDXSaeDsMw4abF','Faith, Sabbath and Christian Hope','Ask NT Wright Anything','faith · sabbath'],
    ['2cMUg5Oc1o4PO7L1nRLGT2','Is the Sabbath Still Relevant for Christians?','The Crossway Podcast','sabbath · rest'],
    ['6BhYHj89g7Q0OQ5phIOGWe','Does God Lead Us Into Temptation?','BibleProject','temptation · prayer'],
    ['67UrQwtlzo9raLOCiuhSIb','How Do We Pray? The Theology of Prayer','Back Porch Theology','prayer · theology'],
    ['2RevSI2XkQd1Z2FAmuwYAE','Intro to BibleProject Podcast','BibleProject','bible · formation'],
    ['51efUzkqvIdnBUFJzn8xKw',"Sabbath Isn't Just a Day Off",'The Christian Clinician','sabbath · rest'],
    ['47uCd08HL8Aa8hO8PM6UGt','Contemplative Prayer','Hearing Jesus','prayer · reflection'],
    ['1pQo6Aehk5wfYOAxqNOrMi','The Role of the Bible','Sabbath School with Dwain Esmond','bible · formation']
  ];
  const KEY='clearcore-pages-podcast-v1';
  let current=0, expanded=false, loaded=null;
  try { const s=JSON.parse(localStorage.getItem(KEY)||'{}'); if(Number.isInteger(s.current)&&s.current>=0&&s.current<episodes.length) current=s.current; } catch(_) {}
  const save=()=>{try{localStorage.setItem(KEY,JSON.stringify({current}))}catch(_){}};
  const different=()=>{let n=current;while(n===current)n=Math.floor(Math.random()*episodes.length);return n};

  const style=document.createElement('style');
  style.textContent=`
    #ccfix{font-family:Inter,system-ui,-apple-system,sans-serif;position:relative;z-index:2147483640}
    #ccfix-launch{position:fixed;right:8px;bottom:max(76px,calc(66px + env(safe-area-inset-bottom)));z-index:2147483642;min-width:132px;border:1px solid rgba(16,185,129,.5);border-radius:999px;background:#fff;color:#047857;padding:11px 15px;font-weight:800;box-shadow:0 10px 30px rgba(15,23,42,.24);touch-action:manipulation}
    #ccfix-panel{position:fixed;right:6px;bottom:max(72px,calc(62px + env(safe-area-inset-bottom)));z-index:2147483643;width:min(520px,calc(100vw - 12px));box-sizing:border-box;border:1px solid rgba(16,185,129,.35);border-radius:18px;background:#fff;color:#0f172a;padding:12px;box-shadow:0 20px 60px rgba(15,23,42,.3);transition:opacity .12s ease,transform .12s ease}
    #ccfix-panel.collapsed{opacity:0;visibility:hidden;pointer-events:none;transform:translateY(18px) scale(.98)}
    #ccfix-frame{display:block;width:100%;height:152px;border:0;border-radius:12px;background:#f1f5f9;margin-top:10px}
    .ccfix-head{display:flex;gap:8px;align-items:flex-start;justify-content:space-between}.ccfix-kicker{font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#059669}.ccfix-title{font-size:15px;font-weight:800;line-height:1.3;margin:4px 0 0}.ccfix-meta{font-size:11px;color:#64748b;margin:4px 0 0}.ccfix-close{width:38px;height:38px;flex:0 0 38px;border:1px solid #dbe5df;border-radius:10px;background:#f8fafc;color:#334155;font-size:22px}.ccfix-actions{display:flex;gap:7px;flex-wrap:wrap;margin-top:9px}.ccfix-actions button,.ccfix-actions a{border-radius:10px;padding:9px 11px;font:700 12px/1.2 Inter,system-ui,sans-serif;text-decoration:none}.ccfix-next{border:0;background:#059669;color:#fff}.ccfix-open{border:1px solid #d8e7df;background:#f0fdf4;color:#047857}.ccfix-note{font-size:10px;color:#64748b;line-height:1.4;margin:8px 0 0}
    @media(prefers-color-scheme:dark){#ccfix-launch,#ccfix-panel{background:#0f172a;color:#f8fafc;border-color:rgba(52,211,153,.4)}.ccfix-meta,.ccfix-note{color:#94a3b8}.ccfix-close{background:#111827;color:#e5e7eb;border-color:#334155}.ccfix-open{background:#10251e;color:#6ee7b7;border-color:#275a46}}
    @media(max-width:640px){.ccfix-actions>*{flex:1;text-align:center}}
  `;
  document.head.appendChild(style);

  const root=document.createElement('div');
  root.id='ccfix';
  root.innerHTML=`<button id="ccfix-launch" type="button">🎧 Podcasts</button><aside id="ccfix-panel" class="collapsed" aria-hidden="true"><div class="ccfix-head"><div><div class="ccfix-kicker">ClearCore · faith / formation</div><div class="ccfix-title"></div><div class="ccfix-meta"></div></div><button class="ccfix-close" type="button" aria-label="Collapse podcast controls">×</button></div><iframe id="ccfix-frame" title="ClearCore Spotify podcast" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe><div class="ccfix-actions"><button class="ccfix-next" type="button">🎲 Different podcast</button><a class="ccfix-open" target="_blank" rel="noopener noreferrer">Open in Spotify ↗</a></div><p class="ccfix-note">Closing only collapses these controls. The same Spotify iframe stays mounted, so playback can continue while you use ClearCore.</p></aside>`;
  document.body.appendChild(root);
  const launch=root.querySelector('#ccfix-launch'),panel=root.querySelector('#ccfix-panel'),frame=root.querySelector('#ccfix-frame'),title=root.querySelector('.ccfix-title'),meta=root.querySelector('.ccfix-meta'),open=root.querySelector('.ccfix-open');
  function update(){const e=episodes[current];title.textContent=e[1];meta.textContent=`${e[2]} · ${e[3]}`;open.href=`https://open.spotify.com/episode/${e[0]}`;if(loaded!==e[0]){loaded=e[0];frame.src=`https://open.spotify.com/embed/episode/${e[0]}?theme=0`;}}
  function show(){update();expanded=true;panel.classList.remove('collapsed');panel.setAttribute('aria-hidden','false');launch.style.visibility='hidden';}
  function close(){expanded=false;panel.classList.add('collapsed');panel.setAttribute('aria-hidden','true');launch.style.visibility='visible';}
  launch.addEventListener('click',show);
  root.querySelector('.ccfix-close').addEventListener('click',close);
  root.querySelector('.ccfix-next').addEventListener('click',()=>{current=different();save();loaded=null;update();});
})();