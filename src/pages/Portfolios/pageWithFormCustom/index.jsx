import React, { useState } from "react";
// components
import MyFormWithCustom from "../../../components/MyFormWithCustom/MyFormWithCustom";
// css
import "./styles.scss"

const PageWithFormCustom = () => {
	const [isFormActive, setIsFormActive] = useState(true)

    return (
        <div className="page pageWithFormCustom">
            <div className="mainContent">
                <div className="mainContent-wrapper">
                    <div className="showForm_button-wrapper">
                        <button 
							onClick={()=>{setIsFormActive(true)}}
							className="showForm_button">
								Click to fill out the form
						</button>
                    </div>
                    <article>
                        <h2>headline 1</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, magnam sed. Quia sed accusamus quasi nisi
                            consectetur veniam pariatur vero esse. Adipisci, nam cum ea earum Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Sunt, magnam sed. Quia sed accusamus quasi nisi consectetur veniam pariatur vero esse.
                            Adipisci, nam cum ea earum nesciunt nostrum culpa autem aliquam explicabo a corporis fuga quas tenetur
                            exercitationem. Minima ipsum autem ea perferendis officia, quam ipsam impedit aspernatur ullam expedita facere
                            libero sed quasi odio! Doloremque dolor magni vero esse.
                        </p>
                    </article>
                    <article>
                        <h2>headline 1</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, magnam sed. Quia sed accusamus quasi nisi
                            consectetur veniam pariatur vero esse. Adipisci, nam cum ea earum nesciunt nostrum culpa autem aliquam explicabo
                            a corporis fuga quas tenetur exercitationem. Minima ipsum autem ea perferendis officia, quam ipsam impedit
                            aspernatur ullam expedita facere libero sed quasi odio! Doloremque dolor magni vero esse. Lorem, ipsum dolor sit
                            amet consectetur adipisicing elit. Sapiente itaque, doloremque tempora, consequuntur, sit temporibus ducimus
                            delectus fugit est dolore qui a? Pariatur rerum molestias, ipsum nemo explicabo obcaecati ex? Lorem ipsum dolor
                            sit amet consectetur adipisicing elit. Sunt, magnam sed. Quia sed accusamus quasi nisi consectetur veniam
                            pariatur vero esse. Adipisci, nam cum ea earum nesciunt nostrum culpa autem aliquam explicabo a corporis fuga
                            quas tenetur exercitationem.
                        </p>
                    </article>
                    <article>
                        <h2>headline 2</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, magnam sed. Quia sed accusamus quasi nisi
                            consectetur veniam pariatur vero esse. Adipisci, nam cum ea earum nesciunt nostrum culpa autem aliquam explicabo
                            a corporis fuga quas tenetur exercitationem. Minima ipsum autem ea perferendis officia, quam ipsam impedit
                            aspernatur ullam expedita facere libero sed quasi odio! Doloremque dolor magni vero esse.
                        </p>
                    </article>
                    <article>
                        <h2>headline 3</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, magnam sed. Quia sed accusamus quasi nisi
                            consectetur veniam pariatur vero esse. Adipisci, nam cum ea earum. Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Sunt, magnam sed. Quia sed accusamus quasi nisi consectetur veniam pariatur vero esse.
                            Adipisci, nam cum ea earum nesciunt nostrum culpa autem aliquam explicabo a corporis fuga quas tenetur
                            exercitationem.
                        </p>
                    </article>
                    <article>
                        <h2>headline 4</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, magnam sed. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Sunt, magnam sed. Quia sed accusamus quasi nisi consectetur veniam pariatur vero
                            esse. Adipisci, nam cum ea earum nesciunt nostrum culpa autem aliquam explicabo a corporis fuga quas tenetur
                            exercitationem. Minima ipsum autem ea perferendis officia, quam ipsam impedit aspernatur ullam expedita facere
                            libero sed quasi odio! Doloremque dolor magni vero esse.
                        </p>
                    </article>
                    <article>
                        <h2>headline 5</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, magnam sed. Quia sed accusamus quasi nisi
                            consectetur veniam pariatur vero esse. Adipisci, nam cum ea earum nesciunt nostrum culpa autem aliquam explicabo
                            a corporis fuga quas tenetur exercitationem. Minima ipsum autem ea perferendis officia, quam ipsam impedit
                            aspernatur ullam expedita facere libero sed quasi odio! Doloremque dolor magni vero esse. Lorem ipsum dolor sit
                            amet consectetur adipisicing elit.
                        </p>
                    </article>
                    <article>
                        <h2>header 6</h2>
                        <p>
                            {" "}
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus delectus molestias quod? Cum exercitationem
                            animi magni possimus beatae aperiam, voluptas perspiciatis tempore doloremque consequuntur aspernatur, earum
                            voluptate, magnam delectus. Est a voluptatibus totam laudantium, cumque natus. Asperiores delectus architecto
                            enim voluptas unde, maiores blanditiis. Molestiae nemo id qui aut deserunt aperiam ut! Commodi voluptate,
                            obcaecati repellendus blanditiis soluta nulla. Placeat nam qui totam voluptate nesciunt saepe, pariatur quasi
                            exercitationem reiciendis ducimus dignissimos deleniti necessitatibus. Doloribus dicta voluptatibus beatae
                            repellat provident. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, magnam sed. Quia sed
                            accusamus quasi nisi consectetur veniam pariatur vero esse. Adipisci, nam cum ea earum nesciunt nostrum culpa
                            autem aliquam explicabo a corporis fuga quas tenetur exercitationem. Minima ipsum autem ea perferendis officia,
                            quam ipsam impedit aspernatur ullam expedita facere libero sed quasi odio! Doloremque dolor magni vero esse.
                        </p>
                    </article>
                    <article>
                        <h2>header 7</h2>
                        <p>
                            Lorem ipsum Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia distinctio consequuntur expedita,
                            voluptatum nostrum fuga qui quaerat placeat modi ipsa. Quam officia amet ullam nisi illo blanditiis illum
                            deserunt natus! dolor sit amet consectetur adipisicing elit. Sunt, magnam sed. Quia sed accusamus quasi nisi
                            consectetur veniam pariatur vero esse. Adipisci, nam cum ea earum nesciunt nostrum culpa autem aliquam explicabo
                            a corporis fuga quas tenetur exercitationem. Minima ipsum autem ea perferendis officia, quam ipsam impedit
                            aspernatur ullam expedita facere libero sed quasi odio! Doloremque dolor magni vero esse.
                        </p>
                    </article>
                    <article>
                        <h2>header 8</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, magnam sed. Quia sed accusamus quasi nisi
                            consectetur veniam pariatur vero esse. Adipisci, nam cum ea earum nesciunt nostrum culpa autem aliquam explicabo
                            a corporis fuga quas tenetur exercitationem. Minima ipsum autem ea perferendis officia, quam ipsam impedit
                            aspernatur ullam expedita facere libero sed quasi odio! Doloremque dolor magni vero esse.
                        </p>
                    </article>
                </div>
            </div>
			{isFormActive && (
				<MyFormWithCustom
					setIsFormActive = {setIsFormActive}
				/>
			)}
        </div>
    );
};

export default PageWithFormCustom;
