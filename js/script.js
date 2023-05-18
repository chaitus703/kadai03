//DOM
const Key = document.querySelectorAll('#piano li');
const codeTypeText = document.querySelector('#code_type_text');
const codeType = document.getElementsByName("code_type");
const codeKeysText = document.querySelector('#code_keys_text');

//音階
var scale = [
  //休符
  'null', 
  //1オクターブ目
  'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4',
  //2オクターブ目
  'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5',
  //3オクターブ目
  'C6', 'C#6', 'D6', 'D#6', 'E6', 'F6', 'F#6', 'G6', 'G#6', 'A6', 'A#6', 'B6',
];

//コードタイプ
var codeTypes = [
    //ルート音
    {'codeName': '(R)',
        'codeKeys': [1]},
    //三和音
    {'codeName': '(M)',
        'codeKeys': [1,5,8]},
    {'codeName': 'm',
        'codeKeys': [1,4,8]},
    {'codeName': 'dim',
        'codeKeys': [1,4,7]},
    {'codeName': 'aug',
        'codeKeys': [1,5,9]},
    {'codeName': 'sus4',
        'codeKeys': [1,6,8]},
    //四和音
    {'codeName': 'M7',
        'codeKeys': [1,5,8,12]},
    {'codeName': '7',
        'codeKeys': [1,5,8,11]},  
    {'codeName': 'mM7',
        'codeKeys': [1,4,8,12]},
    {'codeName': 'm7',
        'codeKeys': [1,4,8,11]},
    {'codeName': 'm7(-5)',
        'codeKeys': [1,4,7,11]},
    {'codeName': 'dim7',
        'codeKeys': [1,4,7,10]},
    {'codeName': 'augM7',
        'codeKeys': [1,5,9,12]},  
    {'codeName': 'aug7',
        'codeKeys': [1,5,9,11]},  
    {'codeName': 'M7sus4',
        'codeKeys': [1,6,8,12]},  
    {'codeName': '7sus4',
        'codeKeys': [1,6,8,11]},  
    {'codeName': '6',
        'codeKeys': [1,5,8,10]},  
    {'codeName': 'm6',
        'codeKeys': [1,4,8,10]},
];

//和音入れ場
var chords = [];

//和音
for (let h = 0 ; h < codeTypes.length; h++ ) {
  chords.push( [] );
  for (let i = 0 ; i < Key.length; i++ ) {
    chords[h].push( [] );
    for (var  j = 0; j < codeTypes[h]['codeKeys'].length; j++){     
      const nmb = scale[i+codeTypes[h]['codeKeys'][j]];
      chords[h][i].push(nmb); 
    }
  }
}

//コードタイプ設定
  function codeTypeSelect() {
    for(let i = 0; i < codeType.length; i++){
      if(codeType[i].checked) {
        const CodeTypeValue = codeType[i].value;
        codeTypeText.innerHTML = CodeTypeValue;
        const CodeKyesValue = codeTypes[i].codeKeys;  
        codeKeysText.innerHTML = '構成音:' +  CodeKyesValue;
        return chords[i];
      }
    }
  }
codeTypeSelect();

//シンセ生成
var synth = new Tone.PolySynth().toMaster();

//イベントリスナ
for (let i = 0; i < Key.length; i++) {
(function(i) {
  Key[i].addEventListener('click', function () { 
  //チェックされているコードタイプを確認
  var seletcCords = codeTypeSelect();
  //メジャーコードが4分音符の長さ鳴る
  synth.triggerAttackRelease(seletcCords[i], '4n');
  }, false);
 })(i);
}
//  --------------------

