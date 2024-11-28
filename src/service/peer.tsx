class PeerService {
    private peer: RTCPeerConnection | null = null; // Explicitly define the type of `peer`
  
    constructor() {
      this.initializePeer();
    }
  
    private initializePeer(): void {
      if (!this.peer) {
        this.peer = new RTCPeerConnection({
          iceServers: [
            {
              urls: [
                "stun:stun.l.google.com:19302",
                "stun:global.stun.twilio.com:3478",
              ],
            },
          ],
        });
      }
    }
    public getPeer(): RTCPeerConnection | null {
      return this.peer;
    }
  
    async getAnswer(offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit | undefined> {
      console.log(offer," in getanswer function $$$$$$$$$$")
      if (this.peer) {
        console.log(offer," in getanswer function ^^^^^^^^^^^^^^^^")
        console.log("Signaling state before setting local description:", this.peer.signalingState);
        await this.peer.setRemoteDescription(offer);
        console.log("111111111111111111111");
        const answer = await this.peer.createAnswer();
        console.log(answer,"222222222222222");
        if (this.peer.signalingState === "have-remote-offer") {
          await this.peer.setLocalDescription(answer);
        } else {
          console.error("Cannot set local description: Invalid signaling state", this.peer.signalingState);
        }
        // await this.peer.setLocalDescription(new RTCSessionDescription(answer));
        console.log("3333333333333333");
        
        return answer;
      }
      // return undefined; // Handle the case where `peer` is null
    }
  
    async setRemoteDescriptionConfirm(description: RTCSessionDescriptionInit): Promise<void> {
      if (this.peer) {
        await this.peer.setRemoteDescription(description);
      }
    }
  
    async getOffer(): Promise<RTCSessionDescriptionInit | undefined> {
      if (this.peer) {
        const offer = await this.peer.createOffer();
        await this.peer.setLocalDescription(new RTCSessionDescription(offer));
        return offer;
      }
      return undefined; // Handle the case where `peer` is null
    }
  }
  
  export default new PeerService();
  