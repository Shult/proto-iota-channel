const fs = require('fs');

const express = require('express');
const app = express();
const PORT = 8081;

// Get the information for the entry "askCredential" by reading the file user.json
//const channelID = JSON.parse(fs.readFileSync('./channelID.json').toString());

const { exec } = require("child_process");

app.use(express.json())

app.get('/channelID', (req, res) => {
	//Creating channel
	exec("cd .. ; ts-node createChannelFromGetResponseVerifier.ts", (error, stdout, stderr) => {
                console.log("stdout: " + stdout);
                console.log("stderr: " + stderr);

		// Writting the channelID in a file because we need to pass it to the issuer2.ts file.
                fs.writeFile('../channelID.txt', stdout, err => {
                        if (err) {
                                console.error(err);
                        }
                });

		//Send channel ID
		res.status(200).send({
        	        channelID: stdout
	        });

                if (error !== null) {
                        console.log("exec error: " + error);
                }
        });
});

// When the API receive a GET request with channelAuthorizedSubscription, the API will run the program to al>
app.get('/channelAuthorizedSubscription',(req, res) => {
        	exec("cd .. ; ts-node authorizedDidChannelFromGetResponseVerifier.ts", (error, stdout, stderr) => {
                	console.log("stdout: " + stdout);
                	console.log("stderr: " + stderr);
			//Send channel ID
                	res.status(200).send({
                        	response: "authorization ok"
                	});
        	});
});

// There's a new message on the channel so the issuer need to read the channel
app.get('/newMessageOnTheChannel',(req, res) => {
	//Excute issuer on the right channel, by reading the channelID in the file channelID.txt (The to program are>
        exec("cd .. ; ts-node verifier2.ts", (error, stdout, stderr) => {
                //console.log("la il faut lire");
                console.log("stdout: " + stdout);
                console.log("stderr: " + stderr);
                if (error !== null) {
                        console.log("exec error: " + error);
                }
        });

	res.status(200).send({
		response: "The verifier will take your request please wait..."
        });

});


	// Just the example for the API
app.post('/tshirt/:id', (req, res)=> {
	const { id } = req.params;
	const { logo } = req.body;

	if (!logo) {
		res.status(418).send({ message: 'We need a logo!'})
	}

	res.send({
		tshirt:` tshirt with your ${logo} and ID of ${id}`,
	});
});

	// The API is listening on the PORT 8081
app.listen(
	PORT,
	() => console.log(`Verifier alive on http://localhost:${PORT}`)
)
