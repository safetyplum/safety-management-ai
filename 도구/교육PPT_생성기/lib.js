// 공통 양식 라이브러리 (심플 PPT 보완판 규칙: 흰 바탕·검정 글자·흐린 하늘색 포인트)
const pptxgen = require('pptxgenjs');
let applyTheme = async () => {}; // 테마 색 적용(선택): Claude pptx 스킬의 apply_theme.js가 있으면 경로를 지정
try { ({ applyTheme } = require(process.env.APPLY_THEME || './apply_theme.js')); } catch (e) { /* 없으면 기본 테마로 저장 */ }

const FONT = '맑은 고딕';
const THEME = { name: '심플 PPT 보완판', headFontFace: FONT, bodyFontFace: FONT,
  colors: { dk1: '111111', lt1: 'FFFFFF', dk2: '333333', lt2: 'EAF5FC', accent1: '5A9BD0', accent2: 'BFE0F5', accent3: 'FFD84D', accent4: 'F5A04A', accent5: 'D9D9D9', accent6: '7F7F7F', hlink: '1F5F99', folHlink: '5A4E8C' } };
const SKY = 'EAF5FC', SKY2 = 'BFE0F5', BLUE = '5A9BD0', DBLUE = '1F5F99', YEL = 'FFE680', LYEL = 'FFF6CC', ORG = 'FBC08A', GRAY = '666666', BLK = '111111', LINE = 'C9D9E6', LGRAY = 'F2F2F2';

const L = { SEC: '표지', IMG: 'img' };
const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';
pres.theme = { headFontFace: FONT, bodyFontFace: FONT };
pres.author = '김수현';
L.pres = pres;

pres.defineSlideMaster({ title: 'COVER', background: { color: SKY }, objects: [
  { placeholder: { options: { name: 'title', type: 'title', x: 0.8, y: 1.6, w: 11.7, h: 2.3, fontSize: 38, bold: true, color: BLK, valign: 'bottom', align: 'left', fontFace: FONT }, text: '' } },
  { placeholder: { options: { name: 'body', type: 'body', x: 0.8, y: 4.05, w: 11.7, h: 0.9, fontSize: 18, color: '333333', align: 'left', fontFace: FONT }, text: '' } },
] });
pres.defineSlideMaster({ title: 'SECTION', background: { color: 'FFFFFF' }, objects: [
  { placeholder: { options: { name: 'title', type: 'title', x: 0.8, y: 2.7, w: 8.2, h: 1.2, fontSize: 38, bold: true, color: BLK, align: 'left', fontFace: FONT }, text: '' } },
  { placeholder: { options: { name: 'body', type: 'body', x: 0.8, y: 3.95, w: 8.2, h: 0.9, fontSize: 18, color: GRAY, align: 'left', fontFace: FONT }, text: '' } },
], slideNumber: { x: 12.3, y: 7.0, w: 0.6, h: 0.3, fontSize: 10, color: GRAY, fontFace: FONT } });
pres.defineSlideMaster({ title: 'CONTENT', background: { color: 'FFFFFF' }, objects: [
  { placeholder: { options: { name: 'title', type: 'title', x: 0.6, y: 0.35, w: 12.1, h: 0.8, fontSize: 28, bold: true, color: BLK, valign: 'middle', align: 'left', fontFace: FONT }, text: '' } },
], slideNumber: { x: 12.3, y: 7.0, w: 0.6, h: 0.3, fontSize: 10, color: GRAY, fontFace: FONT } });

const T = (o) => Object.assign({ isTextBox: true, margin: 0, color: BLK, fontFace: FONT }, o);
function newSlide(title, note) { const s = pres.addSlide({ masterName: 'CONTENT', sectionTitle: L.SEC }); s.addText(title, { placeholder: 'title' }); if (note) s.addNotes(note); return s; }
function src(s, text) { if (text) s.addText('출처: ' + text, T({ x: 0.6, y: 6.95, w: 11.5, h: 0.35, fontSize: 10, color: GRAY, objectName: '출처' })); }
function tag(s, x, y, text, fill) { s.addText(text || '확인 필요', T({ shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.08, x, y, w: 1.25, h: 0.32, fill: { color: fill || ORG }, fontSize: 11, bold: true, align: 'center', valign: 'middle' })); }
function chk(s, flag) { if (flag) tag(s, 11.3, 0.55); }
function card(s, x, y, w, h, fill) { s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.12, fill: { color: fill || SKY }, line: { color: LINE, width: 0.75 } }); }
function badge(s, x, y, n, fill) { s.addText(String(n), T({ shape: pres.shapes.OVAL, x, y, w: 0.55, h: 0.55, fill: { color: fill || SKY2 }, fontSize: 16, bold: true, align: 'center', valign: 'middle' })); }
function arrow(s, x, y) { s.addShape(pres.shapes.ISOSCELES_TRIANGLE, { x, y, w: 0.3, h: 0.16, rotate: 90, fill: { color: BLUE }, line: { color: BLUE } }); }
const bul = (arr, gap) => arr.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < arr.length - 1, paraSpaceAfter: gap || 10 } }));
function keyBar(s, text, y) { if (text) s.addText(text, T({ x: 0.6, y: y || 6.15, w: 12.1, h: 0.6, fontSize: 15, bold: true, fill: { color: LYEL }, margin: 0.12, valign: 'middle' })); }
const H = (t) => ({ text: t, options: { bold: true, fill: { color: SKY2 } } });
function pic(s, name, x, y, w, alt) { s.addImage({ path: `${L.IMG}/${name}.jpg`, x, y, w, h: w, altText: alt || '그림' }); }

function cover(title, sub, img, note) {
  const s = pres.addSlide({ masterName: 'COVER', sectionTitle: L.SEC });
  s.addText(title, { placeholder: 'title' }); s.addText(sub, { placeholder: 'body' });
  s.addText('[발표자 / 기관명]     [교육일 2026.  .  ]', T({ x: 0.8, y: 5.6, w: 8, h: 0.5, fontSize: 16, color: '333333' }));
  pic(s, img, 10.4, 4.95, 2.1, '표지 그림'); s.addNotes(note); return s;
}
function closing(title, sub, img, note) {
  const s = pres.addSlide({ masterName: 'COVER', sectionTitle: L.SEC });
  s.addText(title, { placeholder: 'title' }); s.addText(sub, { placeholder: 'body' });
  s.addText('[문의처 / 담당자]', T({ x: 0.8, y: 6.3, w: 6, h: 0.4, fontSize: 14, color: '333333' }));
  pic(s, img, 10.4, 4.95, 2.1, '마무리 그림'); s.addNotes(note); return s;
}
function section(num, title, sub, img, note) {
  const s = pres.addSlide({ masterName: 'SECTION', sectionTitle: L.SEC });
  s.addText(`PART ${num}`, T({ x: 0.8, y: 2.1, w: 4, h: 0.5, fontSize: 18, bold: true, color: DBLUE }));
  s.addText(title, { placeholder: 'title' }); s.addText(sub, { placeholder: 'body' });
  pic(s, img, 9.4, 1.9, 3.0, title + ' 그림'); s.addNotes(note || `${title} 파트입니다.`); return s;
}
function toc(items, note) {
  const s = newSlide('목차', note);
  items.forEach((t, i) => { const col = i < 3 ? 0 : 1, row = i % 3, x = 0.9 + col * 6.1, y = 1.6 + row * 1.6;
    badge(s, x, y + 0.12, i + 1);
    s.addText(t[0], T({ x: x + 0.8, y, w: 5, h: 0.5, fontSize: 22, bold: true }));
    s.addText(t[1], T({ x: x + 0.8, y: y + 0.55, w: 5, h: 0.4, fontSize: 15, color: GRAY })); });
  return s;
}
function bullets(o) {
  const s = newSlide(o.t, o.n);
  if (o.c) {
    card(s, 0.6, 1.45, 7.6, 4.55);
    s.addText(bul(o.i, 14), T({ x: 0.9, y: 1.7, w: 7.0, h: 4.1, fontSize: o.fs || 16, valign: 'top' }));
    card(s, 8.5, 1.45, 4.2, 4.55, LYEL);
    s.addText(o.c[0], T({ x: 8.7, y: 1.9, w: 3.8, h: 1.4, fontSize: o.c[0].length > 8 ? 30 : 40, bold: true, align: 'center', valign: 'middle' }));
    s.addText(o.c[1], T({ x: 8.8, y: 3.4, w: 3.6, h: 2.4, fontSize: 15, align: 'center', valign: 'top' }));
  } else {
    card(s, 0.6, 1.45, 12.1, 4.55);
    s.addText(bul(o.i, 14), T({ x: 0.95, y: 1.7, w: 11.4, h: 4.1, fontSize: o.fs || 17, valign: 'top' }));
  }
  keyBar(s, o.k); src(s, o.s); chk(s, o.chk); return s;
}
function cards(o) {
  const s = newSlide(o.t, o.n);
  const n = o.i.length, gap = 0.23, w = (12.1 - gap * (n - 1)) / n, h = o.k ? 4.45 : 4.95;
  o.i.forEach((c, i) => { const x = 0.6 + i * (w + gap);
    card(s, x, 1.45, w, h, i === o.hi ? LYEL : SKY);
    s.addText(c[0], T({ x: x + 0.22, y: 1.65, w: w - 0.44, h: 0.65, fontSize: c[0].length > 9 ? 20 : 26, bold: true, valign: 'middle' }));
    s.addText(c[1], T({ x: x + 0.22, y: 2.35, w: w - 0.44, h: 0.5, fontSize: 16, bold: true, color: DBLUE }));
    s.addText(c[2], T({ x: x + 0.22, y: 2.95, w: w - 0.44, h: h - 1.65, fontSize: 14, valign: 'top' })); });
  keyBar(s, o.k); src(s, o.s); chk(s, o.chk); return s;
}
function steps(o) {
  const s = newSlide(o.t, o.n);
  const n = o.i.length, gap = 0.3, w = (12.1 - gap * (n - 1)) / n, h = o.k ? 4.45 : 4.95;
  o.i.forEach((c, i) => { const x = 0.6 + i * (w + gap);
    card(s, x, 1.45, w, h); badge(s, x + 0.22, 1.65, i + 1);
    s.addText(c[0], T({ x: x + 0.22, y: 2.35, w: w - 0.44, h: 0.65, fontSize: n > 4 ? 16 : 18, bold: true, valign: 'top' }));
    s.addText(c[1], T({ x: x + 0.22, y: 3.05, w: w - 0.44, h: h - 1.75, fontSize: 14, valign: 'top' }));
    if (i < n - 1) arrow(s, x + w - 0.02, 3.6); });
  keyBar(s, o.k); src(s, o.s); chk(s, o.chk); return s;
}
function table(o) {
  const s = newSlide(o.t, o.n);
  s.addTable([o.h.map(H), ...o.r], { x: 0.6, y: 1.4, w: 12.1, colW: o.w, fontSize: o.fs || 13, fontFace: FONT, color: BLK, border: { type: 'solid', pt: 0.75, color: LINE }, valign: 'middle', margin: 0.07, autoPage: false });
  if (o.img) pic(s, o.img, 11.15, 4.4, 1.55, o.imgAlt);
  keyBar(s, o.k); src(s, o.s); chk(s, o.chk); return s;
}
function compare(o) {
  const s = newSlide(o.t, o.n); const h = o.k ? 4.45 : 4.95;
  card(s, 0.6, 1.45, 5.8, h, LGRAY); card(s, 6.9, 1.45, 5.8, h, SKY);
  s.addText(o.lh, T({ x: 0.9, y: 1.65, w: 5.2, h: 0.55, fontSize: 20, bold: true }));
  s.addText(o.rh, T({ x: 7.2, y: 1.65, w: 5.2, h: 0.55, fontSize: 20, bold: true }));
  s.addText(bul(o.li, 12), T({ x: 0.9, y: 2.35, w: 5.2, h: h - 1.1, fontSize: 15, valign: 'top' }));
  s.addText(bul(o.ri, 12), T({ x: 7.2, y: 2.35, w: 5.2, h: h - 1.1, fontSize: 15, valign: 'top' }));
  arrow(s, 6.5, 3.6); keyBar(s, o.k); src(s, o.s); chk(s, o.chk); return s;
}
function caseS(o) {
  const s = newSlide(o.t, o.n);
  s.addText(o.m, T({ x: 0.6, y: 1.2, w: 12.1, h: 0.4, fontSize: 14, color: GRAY }));
  card(s, 0.6, 1.75, 6.3, 4.2); card(s, 7.15, 1.75, 5.55, 4.2, LYEL);
  s.addText(o.lh || '사고 내용·위반 사항', T({ x: 0.85, y: 1.9, w: 5.8, h: 0.45, fontSize: 17, bold: true, color: DBLUE }));
  s.addText(bul(o.f, 8), T({ x: 0.85, y: 2.45, w: 5.85, h: 3.4, fontSize: 14, valign: 'top' }));
  s.addText(o.rh || '처벌 결과', T({ x: 7.4, y: 1.9, w: 3.8, h: 0.45, fontSize: 17, bold: true, color: DBLUE }));
  s.addText(bul(o.r, 8), T({ x: 7.4, y: 2.45, w: 5.1, h: 3.4, fontSize: 14, valign: 'top' }));
  if (o.chk) tag(s, 11.25, 1.9);
  keyBar(s, '관리감독자 교훈: ' + o.l, 6.1); src(s, o.s); return s;
}
const CH = { catAxisLabelColor: '333333', valAxisLabelColor: '333333', catAxisLabelFontFace: '+mn-lt', valAxisLabelFontFace: '+mn-lt', dataLabelFontFace: '+mn-lt', titleFontFace: '+mn-lt', legendFontFace: '+mn-lt', dataLabelColor: '111111', catAxisLabelFontSize: 13, valAxisLabelFontSize: 12, dataLabelFontSize: 14 };
function barChart(o) {
  const s = newSlide(o.t, o.n);
  s.addChart(pres.charts.BAR, [{ name: o.sn || '값', labels: o.lab, values: o.val }], Object.assign({ x: 0.6, y: 1.4, w: 7.9, h: o.k ? 4.6 : 5.2, barDir: o.dir || 'bar', chartColors: [BLUE], showValue: true, dataLabelPosition: 'outEnd', valGridLine: { color: 'E0E0E0', size: 0.5 }, catGridLine: { style: 'none' }, showLegend: false, showTitle: false, catAxisOrientation: (o.dir || 'bar') === 'bar' ? 'maxMin' : 'minMax' }, CH));
  card(s, 8.8, 1.4, 3.9, o.k ? 4.6 : 5.2, LYEL);
  s.addText(o.c[0], T({ x: 8.9, y: 1.75, w: 3.7, h: 1.0, fontSize: 40, bold: true, align: 'center' }));
  s.addText(o.c[1], T({ x: 9.0, y: 2.85, w: 3.5, h: 1.4, fontSize: 15, align: 'center' }));
  if (o.side) s.addText(bul(o.side, 8), T({ x: 9.05, y: 4.2, w: 3.45, h: 1.6, fontSize: 13, valign: 'top' }));
  keyBar(s, o.k); src(s, o.s); chk(s, o.chk); return s;
}
async function save(out) { console.log('slides:', pres.slides.length); await pres.writeFile({ fileName: out }); await applyTheme(out, THEME); console.log('saved', out); }
module.exports = { L, pres, cover, closing, section, toc, bullets, cards, steps, table, compare, caseS, barChart, save, tag };
