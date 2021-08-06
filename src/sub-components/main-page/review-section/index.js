import React from "react";

import ReviewPanel from "../../../../components/review-panel";
import Heading from "../../../../components/heading";
import Text from "../../../../components/text";
import Link from "../../../../components/link";

import Section from "../../home-section";
import StyledReview from "./styled-review";
import {Review, Indx} from "./sub-components/review";

const ReviewSection = ({
header, 
textFrontLink,
textLink, 
hrefLink, 
textAfterLink, 
data,
...rest
}) => {
    return (
        <Section 
            background= {"#f9f9f9"}
            padding= {"112px 0"}
            tabletPadding={"80px 0 96px"}
            mobileLPadding={"48px 0"}
            {...rest}
        >
            <StyledReview>
                <Heading 
                    textAlign="center"
                    level={3}
                >
                    {header}
                </Heading> 
                <div className="review-panel-block">            
                    {Indx.map((it) => {
                    return(<div className={`review-card`}>
                                {Review.map((item, idx) => item.indx === it 
                                    &&              
                                    <ReviewPanel 
                                        key={idx}
                                        margin={"0px"}
                                        paddingBottomHeader={"1px"}
                                        className={item.className}                             
                                        headerText={item.fullName}
                                        countStar={item.rating}
                                        mainText={item.review}
                                    />                           
                                )}
                            </div>)    
                        })
                    }
                </div>          
                <Text 
                    className="review-description"
                    textAlign="center" 
                    fontStyle="italic" 
                    lineHeight="160%"
                >
                    {textFrontLink}
                <Link href={hrefLink}>{textLink}</Link>{textAfterLink}</Text>
            </StyledReview>
        </Section>
    );
}

export default ReviewSection;