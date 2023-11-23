# SDET_Assessment

This repository contains a series of automated tests written using Playwright for a React web application by Fetch. The tests cover various functionalities of the application, including button clicks, input validation, and the identification of a fake gold bar using a binary search algorithm.

## To install Playwright dependencies and run the tests, follow these steps:

#### Clone the Repository:

` git clone https://github.com/SiDDyy007/SDET_Assessment.git `

` cd SDET_Assessment `

#### Install Dependencies:
` npm install `

#### Run Tests in UI Mode:
Playwright tests can be run in a UI mode for better visualization of the test execution.

` npx playwright test --ui `

This command runs the tests in a browser window, allowing you to see the tests as they are being executed.

## Test Files Description
Each test file in this repository is designed to cover specific aspects of the application:

1. buttonClicks.spec.js: This test ensures that the 'Weigh' and 'Reset' buttons on the application are clickable and functioning as expected.

2. bowlFilling.spec.js: This test automates the process of filling in the left and right bowl grids with numbers and checks if the inputs are correctly populated.

3. weighingList.spec.js: This test focuses on the functionality of the weighing list. It verifies whether the list gets updated correctly upon weighing the bowls.

4. barClick.spec.js: This test simulates the clicking of gold bar buttons and checks for the appearance of alert messages, ensuring each button triggers the correct response.

5. findFakeBar.spec.js: This test implements a binary search algorithm to identify the fake gold bar. The algorithm splits the set of bars into groups, compares their weights, and narrows down the search for the fake bar based on the weighing results.

### Binary Search Logic
In the findFakeBar.spec.js file, a binary search algorithm is utilized to efficiently find the fake gold bar. The algorithm works as follows:

- Initially, it divides the set of gold bars into two groups and weighs them.
- If both groups weigh the same, the remaining bar (not in either group) is identified as the fake one.
- If there is a weight difference, it further divides the lighter group and repeats the process.
- This process continues until the fake gold bar, which weighs less, is isolated.
