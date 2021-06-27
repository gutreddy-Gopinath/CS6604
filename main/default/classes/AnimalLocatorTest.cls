@isTest
private class AnimalLocatorTest {
    @isTest static void AnimalLocatorMock(){
        Test.setMock(HttpCalloutMock.Class, new AnimalLocatorMock());
        String result = AnimalLocator.getAnimalNameById(2);
        String expectedResult = 'Lion';
        System.assertEquals(expectedResult, result);
    }
}