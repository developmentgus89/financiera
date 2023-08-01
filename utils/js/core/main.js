        
    $(document).ready(function () {

        const valid_access = (usrname, usrpass) => {

        }



        $('#btnLoginStart').click(() => {
            let strname = $('#username').val();
            let strpass = $('#usrpassword').val();
            valid_access(strname, strpass);
        });
    });
