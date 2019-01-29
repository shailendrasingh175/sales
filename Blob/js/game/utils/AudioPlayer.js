
/**
 * Created with JetBrains WebStorm.
 * User: amit.k
 * Date: 12/18/13
 * Time: 6:30 PM
 * To change this template use File | Settings | File Templates.
 */
var AudioPlayer = function(TGERef)
{
    this.reference = TGERef;
};

AudioPlayer.prototype =
{
    playAudio: function(id, loop)
    {
      try{
          loop = loop == undefined || loop == false ? 0 : 1;
      }catch(e){
          TGE.log("Custom Audio Error "+ e);
      }

        this.reference.audioManager.Play({id: ""+id, loop: ""+loop});
    }
};

