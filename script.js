
class formulario {
    constructor() {
       /* Creating a new object with all the inputs and the buttons. */
        this.xname = /^[A-Z][a-z]+$/;
        this.xsurname = /^[A-Z][a-z]+(\s[A-Z][a-z]+){1,2}$/;
        this.xidcard = /^[0-9]{8}[A-Z]$/;
        this.xdate = /^([0-2][0-9]|3[0-1])\/(0[0-9]|1[0-2])\/(19|20)[0-9]{2}$/;
        this.xpostalcode = /^[0-9]{5}$/;
        this.xemail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        this.xtelephone = /^[0-9]{9}$/;
        this.xmobile = /^[0-9]{9}$/;
        this.xiban = /^[A-Z]{2}[0-9]{22}$/;
        this.xcreditcard = /^[0-9]{16}$/;
        this.xpassword = /^(?=.[A-Za-z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&]{12,}$/;
        this.xrepeatpassword = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[^\da-zA-Z]).{8,12}$/;
        this.inputs = document.querySelectorAll('input');
        this.input = document.querySelectorAll(".input");
        this.btnGetfile = document.querySelector('#btnGetfile');
        this.btnGet = document.querySelector('#btnGet');
        this.btnPost = document.querySelector('#btnPost');
        this.xmlhttp = new XMLHttpRequest();
        this.obj = {
            name     : this.input[0].value,
            surname  : this.input[1].value,
            dni      : this.input[2].value,
            date     : this.input[3].value,
            cp       : this.input[4].value,
            mail     : this.input[5].value,
            phone    : this.input[6].value,
            mobile   : this.input[7].value,
            card     : this.input[8].value,
            iban     : this.input[9].value,
            password : this.input[10].value,
        };
        /* A loop that is going through all the inputs and adding an event listener to each one of
        them. */
        this.inputs.forEach((input) => {
            input.addEventListener('keyup', (e) => {
                console.log(e.target.value)
                this.validate(e);
            });
        });

        this.btnGetfile.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('enviado');
            fetch('file.json')
              .then(response => response.json())
              .then(data => {
                // Aqui tienes el objeto javascript 
                console.log(data);
                this.insertdata(data);
              })
              .catch(error => {
                console.error('Error al cargar el archivo JSON:', error);
              });
        });

        this.btnGet.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('enviado');
            this.xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(this.responseText);
                    let data = JSON.parse(this.responseText);
                    
                    console.log(data.name); 
                    form.insertdata(data);
                    }
                };
            this.xmlhttp.open("GET", "http://localhost/project8/file.php", true);
            this.xmlhttp.send();
        });

        this.btnPost.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('enviado');
             let dbParam = JSON.stringify(this.obj);
            this.xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  console.log(this.responseText);
                  myObj = JSON.parse(this.responseText);
                  console.log(myObj); 
              }
              };
            this.xmlhttp.open("POST", "http://localhost/project8/file.php", true);
            this.xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            this.xmlhttp.send("x=" + dbParam);
           });
    }

    init() {
        this.validate();
    }

    

    /**
     * If the regular expression is found in the field value, then remove the invalid class and add the
     * valid class. Otherwise, remove the valid class and add the invalid class
     * @param field - The field that is being validated.
     * @param regex - The regular expression to test the field value against.
     */
    validate(field, regex) {   
        if (regex.test(field.value)) {
            console.log(field);
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        } else {
            field.classList.remove('is-valid');
            field.classList.add('is-invalid');
        }
    }

    govalidate(e) {
        if (e.target.name == "name") {
            this.validate(e.target, this.xname)
        };
        if (e.target.name == "surname") {
            this.validate(e.target, this.xsurname)
        };
        if (e.target.name == "idcard") {
            this.validate(e.target, this.xidcard)
        };
        if (e.target.name == "date") {
            this.validate(e.target, this.xdate)
        };
        if (e.target.name == "postalcode") {
            this.validate(e.target, this.xpostalcode)
        };
        if (e.target.name == "email") {
            this.validate(e.target, this.xemail)
        };
        if (e.target.name == "telephone") {
            this.validate(e.target, this.xtelephone)
        };
        if (e.target.name == "mobile") {
            this.validate(e.target, this.xmobile)
        };
        if (e.target.name == "iban") {
            this.validate(e.target, this.xiban)
        };
        if (e.target.name == "creditcard") {
            this.validate(e.target, this.xcreditcard)
        };
        if (e.target.name == "password") {
            this.validate(e.target, this.xpassword)
        };
        if (e.target.name == "password2") {
            this.validate(e.target, this.xrepeatpassword)
        };
    }

    insertdata(data){
        this.input[0].value = data.name;
        this.input[1].value = data.surname;
        this.input[2].value = data.dni;
        this.input[3].value = data.date;
        this.input[4].value = data.cp;
        this.input[5].value = data.mail;
        this.input[6].value = data.phone;
        this.input[7].value = data.mobile;
        this.input[8].value = data.iban;
        this.input[9].value = data.card;
        this.input[10].value = data.password;
        this.input[11].value = data.password;

        this.autovalidate();
    }

    autovalidate() {
        this.inputs.forEach((input) => {
            if (input.name == "name") {
                this.validate(input, this.xname)
            };
            if (input.name == "surname") {
                this.validate(input, this.xsurname)
            };
            if (input.name == "idcard") {
                this.validate(input, this.xidcard)
            };
            if (input.name == "date") {
                this.validate(input, this.xdate)
            };
            if (input.name == "postalcode") {
                this.validate(input, this.xpostalcode)
            };
            if (input.name == "email") {
                this.validate(input, this.xemail)
            };
            if (input.name == "telephone") {
                this.validate(input, this.xtelephone)
            };
            if (input.name == "mobile") {
                this.validate(input, this.xmobile)
            };
            if (input.name == "iban") {
                this.validate(input, this.xiban)
            };
            if (input.name == "creditcard") {
                this.validate(input, this.xcreditcard)
            };
            if (input.name == "password") {
                this.validate(input, this.xpassword)
            };
            if (input.name == "password2") {
                this.validate(input, this.xrepeatpassword)
            };
        });
    }
}
const form = new formulario();
form.init();




