const express = require('express');
const router = express.Router();
const User = require('../Models/user')
const axios = require('axios') 
const fetch = require("node-fetch"); 



router.post('/', async (req, res) => {
    let shouldUpdate = false;
    if(req.body.selection === 'Shufersal'){
        console.log('shufersal')
        const hi = await fetch("https://www.shufersal.co.il/online/he/j_spring_security_check", {
            "headers": {
              "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
              "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
              "cache-control": "max-age=0",
              "content-type": "application/x-www-form-urlencoded",
              "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
              "sec-ch-ua-mobile": "?0",
              "sec-fetch-dest": "document",
              "sec-fetch-mode": "navigate",
              "sec-fetch-site": "same-origin",
              "sec-fetch-user": "?1",
              "upgrade-insecure-requests": "1",
              "cookie": "miglog-cart=81181fff-ef7b-4b4f-bc1d-d0785c38dd79; XSRF-TOKEN=5b8d558a-69c8-4a5d-9e6c-877002395079; JSESSIONID=256AA0C20BE6C297429E0FB9DAAD5AA5; TS01585391=0135176ca7098a5e641bce6e17799f419e708653c67a27be3325535841f629b54e886e2c32608caa78ae27ac8e78b0718f21078babe2f09473ac11522b2dd2f082ba4c748f567c49066af5eec47a38802d87854c84; _ga=GA1.3.866232476.1603192650; _gcl_au=1.1.1201411243.1603192651; com.silverpop.iMAWebCookie=5babc650-4322-45ae-eb30-c0b93bc56d0e; ImcVisitorFlag=1; ServerSessionId=82e8b20d-f106-4ba2-95cd-31c7c00c3de9; StoredServerSessionId=82e8b20d-f106-4ba2-95cd-31c7c00c3de9; ImcAnonymousFlag=1; SMC=ShowBasketInfoFirstTime=True&CommerceID=fd53dd51-e4c4-4137-976c-6ff0538281e7&Session=2b8c6db4-2f5a-4322-aec9-acd54c39b197&Tran=64472; _gac_UA-27526974-16=1.1605630277.Cj0KCQiAhs79BRD0ARIsAC6XpaVfCi8XrCqiYqcCasNWN3IWzsunDlOZZ4S1ntk1cjcN-uIptY47ahgaAuCuEALw_wcB; _gid=GA1.3.2048354199.1608135961; _gac_UA-27526974-1=1.1608135961.CjwKCAiA_eb-BRB2EiwAGBnXXt1WWvTODAPCHej2ekihIDmrePckYB5gqDn4CMO2Ne3ZG97c4RGmpBoCZuMQAvD_BwE; _gcl_aw=GCL.1608135962.CjwKCAiA_eb-BRB2EiwAGBnXXt1WWvTODAPCHej2ekihIDmrePckYB5gqDn4CMO2Ne3ZG97c4RGmpBoCZuMQAvD_BwE; _gac_UA-27526974-20=1.1608137163.CjwKCAiA_eb-BRB2EiwAGBnXXt1WWvTODAPCHej2ekihIDmrePckYB5gqDn4CMO2Ne3ZG97c4RGmpBoCZuMQAvD_BwE; com.silverpop.iMA.session=357e5cc5-d079-ddc1-a036-287009654808; com.silverpop.iMA.page_visit=819143684:-2103592356:; BIGipServerPool_LandingPages=879563786.20480.0000; TS01d710be=018c1146a495b2ec16323ec7e74edabc00897bf85dd48588d88819ab655dac012b99f695ff09ee1a242632b6725bde170a928880cc82783199273543e3a67c9ab24bfeaa79; TScae16bc3027=08ee439653ab20007506ae47a5251aa7dedb0a510245fd30cfe94a35b655284edb535c876c853c5208ea65cc401130001507c01f92235176ba1a4812ded71060b089e08d02ba45e7df6c7849828215146660085f24f74e8373704faa59474423; _gat_UA-27526974-20=1; _gat_UA-27526974-1=1; outbrain_cid_fetch=true; AWSALB=ixUAQH9JYp7jGyWEu8Mqi6DT571V4N/xFixVYG8wY9k0UlYW6/eeuSi18bxB30Zk7/KYLayiOQASJw0GI1qvj2Z6piTl/pwTW5GUMAP7ejNDY0Xr8mfqpCRuuncM; AWSALBCORS=ixUAQH9JYp7jGyWEu8Mqi6DT571V4N/xFixVYG8wY9k0UlYW6/eeuSi18bxB30Zk7/KYLayiOQASJw0GI1qvj2Z6piTl/pwTW5GUMAP7ejNDY0Xr8mfqpCRuuncM; TS0176b833=0135176ca73f9aec17b4f2b4c347d893f18f630ef367b2e0134dfaed74c4633f21f50769f6908e3cad17d02ef34c1aaf36ffd3b6c62fd5309f9e6fa45b24b38e313ea230888ee8237f4dc8abda74a4d0ff335ede18"
            },
            "referrer": "https://www.shufersal.co.il/online/he/login",
            "referrerPolicy": "strict-origin-when-cross-origin",
           "body": `fail_url=%2Flogin%2F%3Ferror%3Dtrue&j_username=${req.body.shufersalUsername}&j_password=${req.body.shufersalPassword}&CSRFToken=5b8d558a-69c8-4a5d-9e6c-877002395079`,
          "method": "POST",
            "mode": "cors"
          });
          if(hi.url === 'https://www.shufersal.co.il/online/he/A'){
              shouldUpdate = true;
          }          
    }
    else{
        console.log('rami')
        const hi2 = await fetch('https://api-prod.rami-levy.co.il/api/v2/site/auth/login', {
            method: 'POST',
            headers: {
                'authority': 'api-prod.rami-levy.co.il',
                'sec-ch-ua': '"Google Chrome";v="87", " Not;A Brand";v="99", "Chromium";v="87"',
                'accept': 'application/json, text/plain, */*',
                'locale': 'he',
                'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjIxNzE5ZDM2NzI0OGYyZDAwY2RkMThmM2U5ZmJhNGYxYTU1OTRkYjZlYjI3ODY4ZTlmZmJhNWI0YTdmNTc2Y2IwNDg3N2FiNjY1ODMwYWNjIn0.eyJhdWQiOiIzIiwianRpIjoiMjE3MTlkMzY3MjQ4ZjJkMDBjZGQxOGYzZTlmYmE0ZjFhNTU5NGRiNmV$',
                'sec-ch-ua-mobile': '?0',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
                'content-type': 'application/json;charset=UTF-8',
                'origin': 'https://www.rami-levy.co.il',
                'sec-fetch-site': 'same-site',
                'sec-fetch-mode': 'cors',
                'sec-fetch-dest': 'empty',
                'accept-language': 'he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({"username":req.body.ramiLevyUsername,"password":req.body.ramiLevyPassword,"id_delivery_times":null})
        });
        console.log(hi2.status)     
        if(hi2.status === 200){
            shouldUpdate = true;
        }   
    }


    if(shouldUpdate){
        console.log('fetch')
        User.findOneAndUpdate({ email: req.body.email },
            {
                shufersalUsername: req.body.shufersalUsername,
                shufersalPassword: req.body.shufersalPassword,
                ramiLevyUsername: req.body.ramiLevyUsername,
                ramiLevyPassword: req.body.ramiLevyPassword,
                selection: req.body.selection,
                sound: req.body.sound
            },{new: true}).
            then(data => {
                res.send(data)
            }).catch(error => res.status(500).send(error))
    }
    else{
        res.status(500).send("שם משתמש וסיסמה לא נמצאו אנא נסה שנית")
    }
    // const isConnected = await axios.get('https://www.shufersal.co.il/online/he/authentication/get-status')
    // console.log(isConnected.data)

    

})

router.post('/update', async (req, res) => {
    console.log('reached')
    let shouldUpdate = false;
    if(req.body.selection === 'Shufersal'){
        console.log('shufersal')
        const hi = await fetch("https://www.shufersal.co.il/online/he/j_spring_security_check", {
            "headers": {
              "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
              "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
              "cache-control": "max-age=0",
              "content-type": "application/x-www-form-urlencoded",
              "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
              "sec-ch-ua-mobile": "?0",
              "sec-fetch-dest": "document",
              "sec-fetch-mode": "navigate",
              "sec-fetch-site": "same-origin",
              "sec-fetch-user": "?1",
              "upgrade-insecure-requests": "1",
              "cookie": "miglog-cart=81181fff-ef7b-4b4f-bc1d-d0785c38dd79; XSRF-TOKEN=5b8d558a-69c8-4a5d-9e6c-877002395079; JSESSIONID=256AA0C20BE6C297429E0FB9DAAD5AA5; TS01585391=0135176ca7098a5e641bce6e17799f419e708653c67a27be3325535841f629b54e886e2c32608caa78ae27ac8e78b0718f21078babe2f09473ac11522b2dd2f082ba4c748f567c49066af5eec47a38802d87854c84; _ga=GA1.3.866232476.1603192650; _gcl_au=1.1.1201411243.1603192651; com.silverpop.iMAWebCookie=5babc650-4322-45ae-eb30-c0b93bc56d0e; ImcVisitorFlag=1; ServerSessionId=82e8b20d-f106-4ba2-95cd-31c7c00c3de9; StoredServerSessionId=82e8b20d-f106-4ba2-95cd-31c7c00c3de9; ImcAnonymousFlag=1; SMC=ShowBasketInfoFirstTime=True&CommerceID=fd53dd51-e4c4-4137-976c-6ff0538281e7&Session=2b8c6db4-2f5a-4322-aec9-acd54c39b197&Tran=64472; _gac_UA-27526974-16=1.1605630277.Cj0KCQiAhs79BRD0ARIsAC6XpaVfCi8XrCqiYqcCasNWN3IWzsunDlOZZ4S1ntk1cjcN-uIptY47ahgaAuCuEALw_wcB; _gid=GA1.3.2048354199.1608135961; _gac_UA-27526974-1=1.1608135961.CjwKCAiA_eb-BRB2EiwAGBnXXt1WWvTODAPCHej2ekihIDmrePckYB5gqDn4CMO2Ne3ZG97c4RGmpBoCZuMQAvD_BwE; _gcl_aw=GCL.1608135962.CjwKCAiA_eb-BRB2EiwAGBnXXt1WWvTODAPCHej2ekihIDmrePckYB5gqDn4CMO2Ne3ZG97c4RGmpBoCZuMQAvD_BwE; _gac_UA-27526974-20=1.1608137163.CjwKCAiA_eb-BRB2EiwAGBnXXt1WWvTODAPCHej2ekihIDmrePckYB5gqDn4CMO2Ne3ZG97c4RGmpBoCZuMQAvD_BwE; com.silverpop.iMA.session=357e5cc5-d079-ddc1-a036-287009654808; com.silverpop.iMA.page_visit=819143684:-2103592356:; BIGipServerPool_LandingPages=879563786.20480.0000; TS01d710be=018c1146a495b2ec16323ec7e74edabc00897bf85dd48588d88819ab655dac012b99f695ff09ee1a242632b6725bde170a928880cc82783199273543e3a67c9ab24bfeaa79; TScae16bc3027=08ee439653ab20007506ae47a5251aa7dedb0a510245fd30cfe94a35b655284edb535c876c853c5208ea65cc401130001507c01f92235176ba1a4812ded71060b089e08d02ba45e7df6c7849828215146660085f24f74e8373704faa59474423; _gat_UA-27526974-20=1; _gat_UA-27526974-1=1; outbrain_cid_fetch=true; AWSALB=ixUAQH9JYp7jGyWEu8Mqi6DT571V4N/xFixVYG8wY9k0UlYW6/eeuSi18bxB30Zk7/KYLayiOQASJw0GI1qvj2Z6piTl/pwTW5GUMAP7ejNDY0Xr8mfqpCRuuncM; AWSALBCORS=ixUAQH9JYp7jGyWEu8Mqi6DT571V4N/xFixVYG8wY9k0UlYW6/eeuSi18bxB30Zk7/KYLayiOQASJw0GI1qvj2Z6piTl/pwTW5GUMAP7ejNDY0Xr8mfqpCRuuncM; TS0176b833=0135176ca73f9aec17b4f2b4c347d893f18f630ef367b2e0134dfaed74c4633f21f50769f6908e3cad17d02ef34c1aaf36ffd3b6c62fd5309f9e6fa45b24b38e313ea230888ee8237f4dc8abda74a4d0ff335ede18"
            },
            "referrer": "https://www.shufersal.co.il/online/he/login",
            "referrerPolicy": "strict-origin-when-cross-origin",
           "body": `fail_url=%2Flogin%2F%3Ferror%3Dtrue&j_username=${req.body.shufersalUsername}&j_password=${req.body.shufersalPassword}&CSRFToken=5b8d558a-69c8-4a5d-9e6c-877002395079`,
          "method": "POST",
            "mode": "cors"
          });
          if(hi.url === 'https://www.shufersal.co.il/online/he/A'){
              shouldUpdate = true;
          }          
    }
    else{
        console.log('rami')
        const hi2 = await fetch('https://api-prod.rami-levy.co.il/api/v2/site/auth/login', {
            method: 'POST',
            headers: {
                'authority': 'api-prod.rami-levy.co.il',
                'sec-ch-ua': '"Google Chrome";v="87", " Not;A Brand";v="99", "Chromium";v="87"',
                'accept': 'application/json, text/plain, */*',
                'locale': 'he',
                'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjIxNzE5ZDM2NzI0OGYyZDAwY2RkMThmM2U5ZmJhNGYxYTU1OTRkYjZlYjI3ODY4ZTlmZmJhNWI0YTdmNTc2Y2IwNDg3N2FiNjY1ODMwYWNjIn0.eyJhdWQiOiIzIiwianRpIjoiMjE3MTlkMzY3MjQ4ZjJkMDBjZGQxOGYzZTlmYmE0ZjFhNTU5NGRiNmV$',
                'sec-ch-ua-mobile': '?0',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
                'content-type': 'application/json;charset=UTF-8',
                'origin': 'https://www.rami-levy.co.il',
                'sec-fetch-site': 'same-site',
                'sec-fetch-mode': 'cors',
                'sec-fetch-dest': 'empty',
                'accept-language': 'he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({"username":req.body.ramiLevyUsername,"password":req.body.ramiLevyPassword,"id_delivery_times":null})
        });
        console.log(hi2.status)     
        if(hi2.status === 200){
            shouldUpdate = true;
        }   
    }


    if(shouldUpdate){
        res.json({should: true})
    }
    else{
        res.json({should:false})
    }

    

})

module.exports = router