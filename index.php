<!DOCTYPE html> 
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="style.css" type="text/css" rel="stylesheet" />
    <link href="src/css/all.min.css" type="text/css" rel="stylesheet" />
    <script src="src/js/all.min.js" type="text/javascript"></script>
    <script src="src/js/jquery-3.3.1.min.js" type="text/javascript"></script>
    <script src="src/js/scrollSuave.js" type="text/javascript"></script>

    <link href="sweetalert2.min.css" type="text/css"/>
    <script src="sweetalert2.all.min.js"></script>
    <title>Escrituras Sagradas YHWH</title>
</head>
<body>

    <span id="top" style="position:absolute; top:0;"></span>

    <div id="center">
        <form method="get">
            <prev></prev>
            <select name="book" class="form-control">
            </select>
            <next></next>
            <button class="btn btn-default" type="submit" id="enviar">abrir</button>
        </form>

        <textarea name="escrituras"></textarea>

        <div id="content">
        <div class="button">
           <!-- <a href="#bottom" class='btn btn-default'>MODO LEITURA <i class="fas fa-align-justify"></i></a>&nbsp;&nbsp; -->
            <a href="#bottom2" class='btn btn-default'>DESCER <i class="fas fa-angle-double-down"></i></a>
        </div>
            <div id="info">
                </div>

            <div id="text">
            </div>

            <br>

            <div class="buttons">
                <div class="controls">
                    <a href="javascript:void(0);" class='btn btn-default' name='anterior'>ANTERIOR</a>
                    <a href="#top" class="btn btn-default">SUBIR <i class="fas fa-angle-double-up"></i></a>
                    <a href="javascript:void(0);" class='btn btn-default' name='proximo'>PRÓXIMO</a>
                </div>
                <div class="copy">
                    <a href="javascript:void(0);" class='btn btn-default' name='copy'>COPIAR <i class="fas fa-copy"></i></a>
                </div>
            </div>
            <br><br>
            <a href="https://andressa-aplicativos.herokuapp.com/apps/escrituras_sagradas.apk">obter aplicativo de celular</a>
        </div> 

        

    </div>

    <span id="bottom"></span><span id="bottom2"></span>

    
</body>
</html>

<style>
    body{font-size:62.5%;}

    .button {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }

    h3 {
        margin-top:3px;
        margin-bottom: -3px;
        padding: 0;
    }

    h3:last-child{
        margin-bottom:15px;
    }

    #center{
        font-family:'Kiwi Maru',sans-serif;
        margin-top:90px;
        display:flex;
        text-align:justify;
        align-items:center;
        flex-direction:column;
    }

    .buttons{
        display: flex;
        flex-direction:row;
        justify-content:space-between;
    }

    #center #content{
     
        margin-top:5px;
        margin-bottom:40px;
        word-spacing: 0.1em;
        letter-spacing: 1px;
        line-height: 1.8em;
        font-size:1.1rem;
        width: 80%;
        padding: 19px;
    }

    #content #info h1{
        text-transform:capitalize!important;
    }

    #enviar{display:none!important;}

    sub, sub a{    
        font-weight: bold;
        font-size: 0.7rem;
        color: #aaa;
        word-spacing: -5px;
        position: relative;
        left: 5px;
    }

    select{cursor:pointer;}

    textarea[name=escrituras]{
        display:none;
        width: 0;
        height:0;
        border:0;
        outline:none;
        background:transparent;
        position:absolute;
        top:0;
        color:transparent;
    }

    @media screen and (max-width:800px){

        .btn-default{
            font-size: 14px;
            height: auto;
            padding: 2px 3px;
        }

        #center #content{
            width:94%;
            font-size:1.0rem;
        }

       form{
        display:flex;
        flex-direction:column;
        margin:0 auto;
        align-items:center;
       }

        
      .form-control, select{
        width:270px;
      }

      form .btn-default{
        margin-top:5px;
        padding: 3px;
        font-size: 15px;
      }
    }
</style>


<script src="src/js/bible.js"></script>
