//API TO COMUNICATE FRONT WITH BACK
const API = (() => {


    // Api to test post and get requests ->
    // read how it works at: http://ptsv2.com/

    const toiletApi = "http://ptsv2.com/";
    const toiletID = "o6jno-1663906012";
    const postURL = `${toiletApi}/t/${toiletID}/post`


    const SignUpRecruiter = async (recruiter) => {
        try {

            const request = await
                fetch(postURL, {
                    method: 'POST',
                    body: JSON.stringify(recruiter)
                });
            console.log(request)
            switch (request.status) {

                case 200:
                    alert("Reclutador registrado exitosamente");
                    break;

                case 404:
                    console.log(request)
                    alert("La petición no dió resultado");
                    break;
            }
        } catch (error) {

            alert("Hubo un problema, intentalo de nuevo en unos minutos");
        }

    }//Closes SignUpRecruiter method


    const SignUpStudent = async (student) => {
        try {

            const request = await
                fetch(`${baseUrl}/api/v1/auth/student`, {
                    method: 'POST',
                    body: JSON.stringify(student)
                });

            console.log(request)

            switch (request.status) {

                case 200:
                    alert("Reclutador registrado exitosamente");
                    break;

                case 404:

                    alert("La petición no dió resultado");
                    break;
            }
        } catch (error) {

            alert("Hubo un problema, intentalo de nuevo en unos minutos");
        }

    }//Closes SignUpRecruiter method




    //Add all methods to expose to other scripts
    return {
        SignUpRecruiter,
        SignUpStudent
    }

})()



export default API
//API TO COMUNICATE FRONT WITH BACK