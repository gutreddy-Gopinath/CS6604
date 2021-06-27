public class FutureMethodDemo {
    
    public FutureMethodDemo(){
        wakingUp();
        takingMedicene();
        ReadingNewsPaper();
        GoingWork();
    }
    @future
    public static void wakingUp(){
        System.debug('Waking Up');
    }
    public static void takingMedicene(){
        System.debug('Taking Medicene');
    }
    public static void ReadingNewsPaper(){
        System.debug('Reading NewsPaper');
    }
    public static void GoingWork(){
        System.debug('Going to Work');
    }

}