package com.team9.manosarthi_backend.Services;

import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Service
public class EmailService {
    public boolean sendEmail(String subject, String msg, String to)
    {
        boolean flag=false;
        //variable for gmail
        String host="smtp.gmail.com";

        String from="manosarthihealthscheme@gmail.com";
        //get system properties
        Properties properties=System.getProperties();
        System.out.println("System Properties:"+properties);

        //setting imp info to properties object
        //host set
        properties.put("mail.smtp.host",host);
        properties.put("mail.smtp.properties","465");
        properties.put("mail.smtp.ssl.enable","true");
        properties.put("mail.smtp.auth","true");
        properties.put("mail.smtp.starttls.enable", "true");


        //step1 = to get session object
        Session session=Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("manosarthihealthscheme@gmail.com","rrcq wwbw nbam xkkp"); //Manosarthi@123
            }
        });

        //for debugging
        session.setDebug(true);
        //step2= compose msg
        MimeMessage message=new MimeMessage(session);
        try {
            //from email
            message.setFrom(from);

            //add recipient to message
            message.addRecipient(Message.RecipientType.TO ,new InternetAddress(to)); //for multiple recipients you can use array of internet adddresses

            //adding subject to message
            message.setSubject(subject);

            //adding text to message
            message.setText(msg);

            //step 3 = send message using transport class
            Transport.send(message);

            System.out.println("mail sent successfully");
            flag=true;
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        return flag;
    }
}
