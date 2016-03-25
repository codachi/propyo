import System;
import System.IO;


static var save = function() {
    var BinaryFile : FileStream   = new FileStream("test-js.dat", FileMode.Create, FileAccess.ReadWrite);
    var Reader     : BinaryReader = new BinaryReader(BinaryFile);
    var Writer     : BinaryWriter = new BinaryWriter(BinaryFile);

    Writer.Write('a');           // 文字列型(2)
    Writer.Write(123);           // int型  (4)
    Writer.Write(456.789);       // float型(4)
    Writer.Write("test string"); // 文字列型(12)

    var ReadCharacter : String;
    var ReadInteger   : int;
    var ReadFloat     : float;
    var ReadString    : String;

    BinaryFile.Seek(0, SeekOrigin.Begin);
    ReadCharacter = Reader.ReadString();
    ReadInteger   = Reader.ReadInt32();
    ReadFloat     = Reader.ReadSingle();
    ReadString    = Reader.ReadString();

    Debug.Log("Character: " + ReadCharacter);
    Debug.Log("Integer: "   + ReadInteger);
    Debug.Log("Single: "    + ReadFloat);
    Debug.Log("String: "    + ReadString);
};
