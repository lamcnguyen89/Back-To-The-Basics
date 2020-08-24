import React from 'react';
import { Header, Message } from "semantic-ui-react";
import GoogleMaps from '../../components/Data';
import Legend from '../../components/legend';
import Forest from "../../../src/images/forest.jpeg";
import Sunset from "../../../src/images/sunset.jpg";
import beach from "../../images/icons/beach.jpg";
import weed from "../../images/icons/weed.jpg";
import gun from "../../images/icons/gun.jpg";
import nationalPark from "../../images/icons/nationalPark.png";
import shopping from "../../images/icons/shopping.jpg";
import statePark from "../../images/icons/statePark.jpg";

// styles
const icon = {
    width: "25px",
    height: "25px",
};
const card = {
width: "18rem",
}
export const displaymap = () => {
    return (
        <>
            <Message className="message-container" size="huge" secondary="true"
            style={{
                backgroundColor:"#909497",
                color:"white",
                backgroundImage:`url(${Sunset})`,
                maxWidth: "100%",
    height: "auto",
    backgroundSize: "cover",

            }}
            >
                
                <Header size="huge"
                style={{
                    color:"#E4A448",
                    fontSize:"50pt",
                    textDecoration: "underline",
                }}
                > Back to the Basics 
                
                </Header>
                <p>Make the outdoors great again!</p>
                <p>...Except for all the deerflies, mosquitoes, poisonous plants, dangerous animals, poop, extreme heat and cold, rain, no electricity, and lack of toilets....</p>

      
        <h1 className="card-title"
        style={{
            listStyleType: "none",
            color:"#F06C25",
            fontSize:"40pt",
            textDecoration: "underline",
          }}
        >Legend</h1>
        <ul>
          <li 
          style={{
            listStyleType: "none",
            color: "#F06C25",
            fontSize:"20pt",
          }}
          >
            Beaches
            <img
              className="icon"
              src={beach}
              style={icon}
            ></img>
          </li>
          <li
          style={{
            listStyleType: "none",
            color:"#F06C25",
            fontSize:"20pt",
          }}
          >
            Marijuana Dispensary
            <img
              className="icon"
              src={weed}
              style={icon}
            ></img>
          </li>
          <li
          style={{
            listStyleType: "none",
            color:"#F06C25",
            fontSize:"20pt",
          }}
          >
            Firearm Shops
            <img
              className="icon"
              src={gun}
              style={icon}
            ></img>
          </li>
          <li
          style={{
            listStyleType: "none",
            color:"#F06C25",
            fontSize:"20pt",
          
          }}
          >
            National Parks
            <img
              className="icon"
              src={nationalPark}
              style={icon}
            ></img>
          </li>
          <li
          style={{
            listStyleType: "none",
            color:"#F06C25",
            fontSize:"20pt",
          
          }}
          >
            Outdoor Stores
            <img
              className="icon"
              src={shopping}
              style={icon}
            ></img>
          </li>
          <li
          style={{
            listStyleType: "none",
            color:"#F06C25",
            fontSize:"20pt",
          
          }}
          >
                 State Parks
                 <img className = "icon"
                 src={statePark}
                 style={icon}
                 ></img></li>
        </ul>
            </Message>
            <GoogleMaps />
           
        </>
    

    
    )
}

export default displaymap;
