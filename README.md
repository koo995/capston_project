# capston_project
<h3>OCR과 translation을 이용한 질의응답 서비스</h3>
<p>
  이미지 처리는 Google Cloud VisionAI의 OCR(Optical Character Recognition) 기능을 이용한다. OCR을 이용해서 얻은 텍스트는 Google Cloud Translate을 이용하여 한국어로 번역한다.<br>
  함께 등록된 이미지에서 텍스트를 추출하고 그 정보를 이용하여 유사성을 감지하고자 한다. 질문자가 게시물을 작성하면, 그 게시물의 이미지에 OCR과 그 결과를 번역하여 데이터베이스에 저장한다.<br>
  그리고 그 데이터를 기반으로 전통적인 유사성 감지 방법인 코사인 유사도를 측정하고, 연관된 게시물을 찾아 추천되도록 서비스를 개발
</p>
<hr>
<p>* 추가할 것<br> 프론트엔드에서 검색 쿼리 전달 미완성<br></p>
