import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsAndConditions = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">The "You Really Shouldn't Be Reading This" Terms and Conditions</h1>
      <div className="shadow-md rounded-lg p-6 md:p-10">
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className=" leading-relaxed flex flex-col items-center justify-center">
            Hold up—are you really reading the Terms and Conditions?
            <img className='rounded-2xl m-3 p-3flex justify-center items-center w-52 md:w-96' src="https://www.memesmonkey.com/images/memesmonkey/41/41d20f82aae376aa9d83f2721b725728.jpeg" alt="" />
            We didn’t think anyone actually did that, but here you are, proving us wrong. Seriously, you must be one of those rare unicorns who reads every line of a software update before clicking “I Agree.” Respect.

            But let’s be real: You’re probably just here because your brain short-circuited and somehow you ended up on this page instead of clicking the checkbox. Don’t worry, we get it—sometimes our fingers slip. Or maybe you’re just procrastinating doing something else, in which case, welcome! You’ve found the perfect place to waste time while pretending to be productive.

            So, since you’re here, we’ve sprinkled in some jokes and memes to make this less painful. Because reading legal stuff is like trying to eat soup with a fork—it’s technically possible, but why would you? Anyway, if you do make it to the end, we’ll give you a virtual high-five. Or, you know, you could just scroll down and check the box like a normal person. We won’t judge (much).          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">2. Registration Obligations</h2>
          <p className=" leading-relaxed">
            By registering, you agree to give us your real email address—yes, the one you actually check and not the one you use for free Wi-Fi sign-ups. Don’t worry, we won’t send you endless cat videos… unless you’re into that kind of thing.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
          <p className=" leading-relaxed">
            Your password is your digital toothbrush: don’t share it, change it regularly, and for the love of memes, don’t make it “password123”. If you do, we’ll assume you want to be the star of our next security breach drama.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">4. Content Ownership</h2>
          <p className=" leading-relaxed">
            You own your content, but if you post a picture of your breakfast and it goes viral, we might claim partial credit. After all, we provided the platform—you provided the avocado toast.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">5. Prohibited Activities</h2>
          <p className=" leading-relaxed">
            No hacking, spamming, or uploading photos of your ex unless they look really bad in them. Also, no dissing our website’s design—we know it’s not a Picasso, but it’s trying its best.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">6. Termination of Use</h2>
          <p className=" leading-relaxed">
            If you break the rules, we’ll banish you to the darkest corners of the internet, where pop-ups never die and autoplay videos reign supreme. Trust us, you don’t want to end up there.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
          <p className=" leading-relaxed">
            We can change these terms whenever we want. Why? Because we’re the all-powerful overlords of this website. But don’t worry, we’ll keep it as confusing as possible so you won’t notice.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
          <p className=" leading-relaxed">
            Got questions? Awesome, so do we! Email us at neverreadthis@yourblog.com, or send us a message via carrier pigeon. We’ll reply as soon as we’ve finished binge-watching the latest Netflix series.
          </p>
        </section>

        <div className="text-center mt-8">
          <button onClick={()=>navigate("/register/profile")} className="px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
            I’m Just Here to Check the Box
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
