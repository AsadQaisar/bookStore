import React from "react";
import aboutUs from "/about_us_page.svg";
import background from "/personal_website.svg";
import team from "/meet_the_team.svg";

function About() {

  return (
    <>
        <div className="pt-28 px-24 items-center justify-center text-center">
            <h1 className="text-2xl md:text-4xl">
            Get to Know <span className="text-pink-500">Us</span>
            </h1>
        </div>

        {/* Section # 1 */}
        <div>
            <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-5">
                <div className="w-full order-2 md:order-1 md:w-1/2 md:mt-14">
                <h1 className="text-2xl md:text-3xl font-bold"> 
                    Discover, Learn, and Share Your Passion for Books{" "} 
                    <span className="text-pink-500">Every Day!</span> 
                </h1> 
                <p className="my-4"> 
                    Our platform is more than just a book store—it's a vibrant community of readers and authors. 
                    Whether you're an avid reader or a curious visitor, you can explore a vast collection of books across diverse genres, from timeless classics to the latest releases. 
                    As a registered user, you gain the power to not only purchase books but also contribute by adding your own titles, sharing your stories, and connecting with fellow book enthusiasts. 
                    Join us on this journey to foster a love of reading and build a dynamic community of lifelong learners and storytellers! 
                </p>
                </div>
                <div className="order-1 w-full mt-6 md:w-1/2">
                <img
                    src={aboutUs}
                    className="md:w-[450px] md:h-[350px] md:ml-12"
                    alt=""
                />
                </div>
            </div>
        </div>

        {/* Section # 2 */}
        <div>
            <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-5">
                <div className="order-1 w-full mt-6 md:w-1/2">
                    <img
                        src={background}
                        className="md:w-[450px] md:h-[350px] md:ml-12"
                        alt=""
                    />
                </div>
                <div className="w-full order-2 md:order-1 md:w-1/2 md:mt-20">
                <h1 className="text-2xl md:text-3xl font-bold">
                    Discover Our Story: From{" "}
                    <span className="text-pink-500">Passion</span>
                    {" "}to{" "}
                    <span className="text-pink-500">Community.</span>
                </h1>
                <p className="my-4">
                    Founded with a passion for books, our platform began as a small community project to connect book lovers. 
                    Over the years, it has grown into a vibrant space for readers and authors alike, offering a diverse collection of books and a place to share, discover, and connect. 
                    Our mission is to make reading accessible and enjoyable for everyone.
                </p>
                </div>
                
            </div>
        </div>

        {/* Section # 3 */}
        <div>
            <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-5">
                <div className="w-full order-2 md:order-1 md:w-1/2 md:mt-16">
                <h1 className="text-2xl md:text-3xl font-bold">
                    Meet the{" "}
                    <span className="text-pink-500">Team</span>
                    {" "}Behind Your{" "}
                    <span className="text-pink-500">Favorite Books.</span>
                </h1>
                <p className="my-4">
                    Our team is passionate about literature and committed to creating the best experience for our readers and authors. 
                    Comprising dedicated professionals with diverse expertise, we work together to enhance your journey through the world of books. 
                    From curating our collection to ensuring top-notch user support, our team is here to make your experience exceptional.
                </p>
                </div>
                <div className="order-1 w-full mt-4 md:w-1/2">
                <img
                    src={team}
                    className="md:w-[450px] md:h-[350px] md:ml-12"
                    alt=""
                />
                </div>
            </div>
        </div>   
    </>
  );
}

export default About;
