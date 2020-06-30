import React, { Component } from 'react';

import {
    FooterContainer,
    FooterFlexContainer,
    IconLinks,
    Disclaimers,
    Disclaimer,
    DisclaimerLink,
    Separator,
    OptionsIcon,
    OptionsImg,
} from './footer-styles.js';

import ReactTooltip from 'react-tooltip'

import githubIcon from '../../assets/images/github-icon.png';
import gitlabIcon from '../../assets/images/gitlab-icon.png';
import cdoIcon from '../../assets/images/cdo-icon.png';



class Footer extends Component {

    render() {
        return (
            <React.Fragment>
                
                <FooterContainer>
                    <FooterFlexContainer>
                        <IconLinks>
                            <OptionsIcon
                                href="https://github.com/DSD-ESDC-EDSC/dynamic-org-chart-ui"
                                target="_blank"
                            >
                                <OptionsImg
                                alt="Github Page"
                                src={githubIcon}
                                data-for="footer"
                                data-tip="Github"
                                />
                            </OptionsIcon>
                        </IconLinks>
                        <Disclaimers>
                            <Disclaimer>
                                Icons used from 
                                <DisclaimerLink href="https://fontawesome.com/" target="_blank">Font Awesome </DisclaimerLink>
                                and 
                                <DisclaimerLink href="https://icons8.com/icons" target="_blank">icons8</DisclaimerLink>
                            </Disclaimer>
                            <Separator> | </Separator>
                            <Disclaimer>
                                SVG images used from
                                <DisclaimerLink href="https://undraw.co" target="_blank">unDraw</DisclaimerLink>
                            </Disclaimer>
                            
                        </Disclaimers>
                    </FooterFlexContainer>
                </FooterContainer>
                <ReactTooltip
                id="footer"
                />
            </React.Fragment>
            
        )
    }
}

export default Footer;