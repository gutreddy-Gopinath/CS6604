import { createElement } from "lwc";
import MeetingRooms from "c/roomParent";

describe("c-roomParent", () => {
  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("count of meeting room should be 5", () => {
    const meetingRooms = createElement("c-roomParent", { is: MeetingRooms });

    document.body.appendChild(meetingRooms);

    const allMeetingRoomComponents =
      meetingRooms.shadowRoot.querySelectorAll("c-room-child");
        
    expect(allMeetingRoomComponents.length).toBe(5);

  });

  it("Title should be Meeting Rooms",()=> {
    const meetingRooms = createElement("c-roomParent",{is:MeetingRooms});

    document.body.appendChild(meetingRooms);
    
    const lightCard = meetingRooms.shadowRoot.querySelector("lightning-card");
      
    expect(lightCard.title).toBe("Meeting Rooms");
  })
});