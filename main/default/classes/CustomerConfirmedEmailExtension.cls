public class CustomerConfirmedEmailExtension {
    private final Account acct;
    public boolean highlight {
        get {
                if (acct.Test_Check__c != null) {
                    return true;
                } else {
                    return false;
                }
            }
        set {}
        }
    public CustomerConfirmedEmailExtension() {

    }
    public CustomerConfirmedEmailExtension(ApexPages.StandardController stdController) {
    this.acct = (Account)stdController.getRecord();
    }
    public PageReference reconfirmEmail () {
        this.acct.Test_Check__c = true;
        update acct;
        //CustomerInteractionExtension.logInteraction (acct.id, 'Confirm Email', 'SFDC', null );
        return null;
    }

}