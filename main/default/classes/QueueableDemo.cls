public class QueueableDemo implements Queueable {
    public void execute(QueueableContext qCntx){
        DELETE [select id from contact Where name='LastName'];
        
        System.enqueueJob(new QueueableDemo1());
    }

}