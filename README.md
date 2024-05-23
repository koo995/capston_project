# capston_project
<h3>OCR과 translation을 이용한 질의응답 서비스</h3>
<p>
  이미지 처리는 Google Cloud VisionAI의 OCR(Optical Character Recognition) 기능을 이용한다. OCR을 이용해서 얻은 텍스트는 Google Cloud Translate을 이용하여 한국어로 번역한다.<br>
  함께 등록된 이미지에서 텍스트를 추출하고 그 정보를 이용하여 유사성을 감지하고자 한다. 질문자가 게시물을 작성하면, 그 게시물의 이미지에 OCR과 그 결과를 번역하여 데이터베이스에 저장한다.<br>
  그리고 그 데이터를 기반으로 전통적인 유사성 감지 방법인 코사인 유사도를 측정하고, 연관된 게시물을 찾아 추천되도록 서비스를 개발
</p>
<hr>
<h3>프로젝트 구조</h3>
<img src="https://github.com/koo995/capston_project/assets/107671886/4c03092f-fa0c-477e-976d-434be60f6290">
<hr>
<h3>학술대회 논문</h3>
<p>이 프로젝트는 한국방송·미디어공학회 2023 하계학술대회에 제출된 논문입니다.</p>
[링크 클릭](https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11514283)
