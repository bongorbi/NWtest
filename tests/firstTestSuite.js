module.exports = {

  elements: {
    leftContent: 'div#left_content',
    rightContent: 'div#right_content',
    rightContBox: '>div.category_box >div.content_box',
    listWithContent: '>ul>li:nth-child(1)',
    divContInRightContBox: '>div.content_box2',
    listWithCont2: '>ul>li:nth-child(3)>a'
  },
  'step one:Searching and selecting Unibit.bg': (browser) => {
    browser.url('https://google.com');
    browser.waitForElementVisible('form input[type=text]')
      .setValue('form input[type=text]', ['unibit', browser.Keys.ENTER]);
    browser.assert.containsText('h3', 'Университет по библиотекознание и информационни ...').click('h3');
  },
  'step two:Finding and selecting weekly schedule': (browser) => {
    const leftContent = 'div#left_content';
    const rightContent = 'div#right_content';
    const rightContBox = '>div.category_box >div.content_box';
    const listWithContent = '>ul>li:nth-child(1)';
    const divContInRightContBox = '>div.content_box2';
    const listWithCont2 = '>ul>li:nth-child(3)>a';
    const weeklySchedule = rightContent + rightContBox + listWithContent + divContInRightContBox + listWithCont2;
    //За 3ти курс КН - 7,1 ----- За 4ти курс КН - 7,2
    //За 3ти курс ИС - 6,1 ----- За 4ти курс ИС - 7,2
    const program = (row, course) => {
      return `div#left_content>table > tbody > tr:nth-child(${row}) > td:nth-child(2) > p:nth-child(2) > a:nth-child(${course})`;
    };
    browser.waitForElementVisible('div#nav').click('div#nav>ul>li:nth-child(3)>a');
    browser.assert.containsText(weeklySchedule, 'Седмична програма');
    browser.waitForElementVisible(rightContent)
      .click(weeklySchedule);
    browser.waitForElementVisible(leftContent)
      .click(program(7, 1))
      .pause(10000);
  }
};
