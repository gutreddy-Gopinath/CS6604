trigger createTrigger on Task (after insert) {
    List<Id> listWhatIds;
    for (Task newTask: Trigger.new){
        if(newTask.WhatId != null){
            /*listWhatIds.add(newTask.WhatId);*/
        }
    }
    
}