module.exports = {
  //стъпка 1 - търсим унибит в google и влизаме в сайта им
  'step one:Searching and selecting Unibit.bg': (browser) => {
    //задаваме началната точка в браузъра да е google.com
    browser.url('https://google.com');
    //чака да се рендерира елементът с посочения в скобите css selector и му слага стойност unibit,
    // след което натиска Enter
    browser.waitForElementVisible('form input[type=text]')
      .setValue('form input[type=text]', ['unibit', browser.Keys.ENTER]);
    //проверява дали в елемента h3 се съдържа посоченият текст и го натиска
    browser.assert.containsText('h3', 'Университет по библиотекознание и информационни ...').click('h3');
  },
  //стъпка 2 - търсим семична програма
  'step two:Finding weekly schedules': (browser) => {
    //направил съм няколко променливи, за да може да е по-прегледно, когато някой чете кода и да може да се рефакторира
    // по-лесно ако някой css selector се промени в бъдеще от unibit.bg
    const rightContent = 'div#right_content';
    const rightContBox = '>div.category_box >div.content_box';
    const listWithContent = '>ul>li:nth-child(1)';
    const divContInRightContBox = '>div.content_box2';
    const listWithCont2 = '>ul>li:nth-child(3)>a';

    const weeklySchedule = rightContent + rightContBox + listWithContent + divContInRightContBox + listWithCont2;
    //чакаме посоченият в скобите елемент да е видим, в случаят контейнерът с търсеното от нас съдържание,
    //след което кикваме на секцията "учебна дейност"
    browser.waitForElementVisible('div#nav').click('div#nav>ul>li:nth-child(3)>a');
    //проверяваме дали в посочения селектор се съдържа текстът "Седмична програма"
    browser.assert.containsText(weeklySchedule, 'Седмична програма');
    //чакаме да стане видим контейнерът на елемента rightContent и натискаме върху секцията "сецмична програма"
    browser.waitForElementVisible(rightContent)
      .click(weeklySchedule);
  },
  //стъпка 3 - избор на курс и специалност
  'step three:Selecting weekly schedule and display it': (browser) => {
    //тук вече има константи, които са функции, за да може да избираме различни курсове и специалности,
    // на които искаме да видим програмите
    const leftContent = 'div#left_content';
    const table = (row) => {
      return `>table > tbody > tr:nth-child(${row}) > td:nth-child(2)`;
    };
    const courseSelector = (course) => {
        return `> p:nth-child(2) > a:nth-child(${course})`;
      }
    ;
    //За 3ти курс КН - 7,1 ----- За 4ти курс КН - 7,2
    //За 3ти курс ИС - 6,1 ----- За 4ти курс ИС - 7,2
    const program = (row, course) => {
      return leftContent + table(row) + courseSelector(course);
    };
    //горе съм сложил легенда, за това как може да изберете програма на различен курс и да се тества с нея
    //само променяте в ".click(program(7,1))" цифрите, както са посочени в легендата по-горе
    //накрая има пауза от 10 секунди, в които да видите програмата и браузърът се затваря
    browser.waitForElementVisible(leftContent)
      .click(program(7, 1))
      .pause(10000);
  }
  //тестът се стартира, като въведете в терминала/конзолата "npm run test:default", което
  //ще стартира теста в Chrome, ако въведете "npm run test:firefox", ще го изпълни в мозила
  //тези настройки са във файла nightwatch.conf.js и package.json
};
