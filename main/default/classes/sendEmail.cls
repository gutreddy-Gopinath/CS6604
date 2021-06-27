Public class sendEmail{
    
    public Account acc{get;set;}
    public string accName{get;set;}
    public string accDesc{get;set;}
    public Id accId{get;set;}
    public void sendEmail(){
         accId = ApexPages.currentPage().getParameters().get('id').escapeHtml4();
        System.debug('My Account Id: '+accId);
    }
    
    public PageReference gopi(Id accId){
        Account ObjAcc = [select id,Name,Description,SLAExpirationDate__c from Account where id =: accId limit 1]; 
        System.debug('My Account : '+ObjAcc);
        ObjAcc.Both_values_are_different__c = true;
        accName = ObjAcc.Name;
        accDesc = ObjAcc.Description;
		return null;
    }
    

/*public void SendEmail1(Id localId){
    System.debug('Enter in to method:');
 Account inv = [Select Id, name From Account Where Id=:localId];
 PageReference pdf = Page.AccountPDF;// Replace PdfOfInvoice with your Page which render as PDF.
 pdf.getParameters().put('id', localId);
// Blob b = pdf.getContentAsPDF();
 Blob b;
 if (Test.IsRunningTest()){b=Blob.valueOf('UNIT.TEST');}else{b = pdf.getContentAsPDF();}
 // Create Attachment Object to attach with Email
 Messaging.EmailFileAttachment efa = new Messaging.EmailFileAttachment();
 efa.setFileName(inv.Name+'.pdf');
 efa.setBody(b);
 // Define the email
 Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
 // Sets the paramaters of the email
 email.setSubject('PDF of Invoice - '+inv.Name);
 email.setToAddresses( new List<String>{'gopinath.guttikonda@gmail.com'} );
 email.setbccAddresses( new List<String>{'gutreddy@deloitte.com'} );
 email.sethtmlBody('Hi '+inv.Name+',<br/><br/> '
                        +'Please find the attached Invoice.'
                        +'<br/><br/>'+'Thanks,'+'<br/>'
                        +UserInfo.getName()+'<br/>'
                        +UserInfo.getOrganizationName());
 email.setFileAttachments(new Messaging.EmailFileAttachment[] {efa});

 try{
      Messaging.SendEmailResult [] result = Messaging.sendEmail(new Messaging.SingleEmailMessage[] {email});
 }catch(System.Exception e){
     
 }
}*/
}