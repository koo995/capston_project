export function parseErrorMessages(fieldsErrorMessages) {
  //python에서 mydict.items()와 비슷한 문법이다. 이렇게 표현함으로써 iterable한 객체를 얻는다?
  return Object.entries(fieldsErrorMessages).reduce(
    //여기서 return을 안해서 오류뜸...
    //실제로 많이 쓰이는 변형방법이니까 알아두자 반드시
    (acc, [fieldName, errors]) => {
      // errors : ["m1", "m2"].join(" ") => "m1 m2"
      acc[fieldName] = {
        //antd에서 정의한 방식에 맞춰어 만들어줬다?
        validateStatus: "error",
        help: errors.join(" "), //에러값을 문자열로 변경해서 help로 보여준다
      };
      return acc;
    },
    {} //빈 object의 초기값
  );
}
