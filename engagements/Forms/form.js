document.getElementById('myform').addEventListener('submit',function(event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const bdate = document.getElementById('bdate').value;

            if (!email) {
                alert("You need an email!")
                return; 
            }

            const birthDate = new Date(bdate);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();

            if (
                today.getMonth() < birthDate.getMonth() || 
                (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
            ) {
                age--;
            }


            if (!bdate || age < 18) {
                alert("You need to be older than 18")
                return;
            }

            const formData = {
                email: email,
                password: password,
                bdate: bdate,
            };

            console.log(formData);
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "submit.json", true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    //alert('Form submitted successfully.');
                    const message = document.getElementById('message');
                    const response = JSON.parse(xhr.responseText);
                    message.textContent = response.message;
                    document.getElementById('myform').reset();
                    //clears the message
                    document.getElementById('myform').textContent = '';
                } else if (xhr.readyState == 4){

                }
            };
            xhr.send();
            
        });