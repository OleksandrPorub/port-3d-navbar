import React from 'react'
import { useInView } from "react-intersection-observer";

// css
import cl from "./MySkillsArticle.module.scss";

const MySkillsArticle = ({classNames, title, children}) => {
    const [observerRef, inView] = useInView({
        threshold: 0.8,
    });

  return (
    <div ref={observerRef} className={classNames +" "+ cl.skills + (inView ? ` ${cl.goodVisible}` : "")}>
        <h3 className={cl.skillsHeadline}>{title}</h3>
        {children}
    </div>
  )
}

export default MySkillsArticle
