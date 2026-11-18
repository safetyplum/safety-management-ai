# 교육 PPT 생성기 (pptxgenjs)

「심플 PPT 템플릿 보완판」 규칙으로 50장 교육 PPT를 만드는 코드입니다. 원고(슬라이드 본문 + 발표자 노트)가 코드 안에 데이터로 들어 있어, 문구를 고친 뒤 다시 실행하면 PPT가 새로 만들어집니다.

| 파일 | 역할 |
|---|---|
| `lib.js` | 공통 양식 — 표지·목차·구분·텍스트·카드·단계·표·비교·사례·막대차트·마무리 배치 |
| `mfg.js` | 제조업 50장 원고 |
| `con.js` | 건설업 50장 원고 |
| `mkimg2.js` | 저화소(240px·JPG) 아이콘 그림 10장씩 생성 (`img_m/`, `img_c/`) |

## 실행 (PC)
```bash
npm install pptxgenjs react react-dom react-icons sharp
node mkimg2.js      # 그림 만들기
node mfg.js         # 제조업 50장
node con.js         # 건설업 50장
```

## 고쳐 쓰는 법
- 슬라이드 문구: `mfg.js`·`con.js`에서 `t:`(제목), `i:`(본문), `n:`(발표자 원고), `s:`(출처)를 고칩니다.
- 「확인 필요」 표시: `chk: true`
- 글꼴·색: `lib.js` 맨 위 `FONT`, 색 상수(SKY·YEL 등)
- 테마 색 적용은 선택 사항입니다(`APPLY_THEME` 환경변수로 apply_theme.js 경로 지정). 없으면 기본 테마로 저장됩니다.

> 장수가 50장을 넘으면 실행 시 `slides:` 숫자로 확인하고 슬라이드를 줄이세요.
