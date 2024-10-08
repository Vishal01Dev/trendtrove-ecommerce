
const About = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start p-5 sm:p-10 space-y-10 md:space-y-0">
      <div className="w-full md:w-2/3 space-y-8">
        <div className="text-left space-y-4">
          <h2 className="text-3xl font-bold">ABOUT TREND TROVE</h2>
          <p className="text-lg">
            Welcome to <span className="font-bold">Trend Trove</span>, your
            one-stop destination for the latest in fashion and trends. We’re
            dedicated to offering the best products, with a focus on quality,
            customer service, and uniqueness.
          </p>
          <p className="text-lg">
            Founded in 2023, Trend Trove has come a long way from its humble
            beginnings. When we first started out, our passion for sustainable
            and trendy fashion drove us to start our own business. Today, we
            serve customers all over the world, and are thrilled to be a part of
            the eco-conscious wing of the fashion industry.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Our Mission</h3>
          <p className="text-lg">
            Our mission at Trend Trove is to provide high-quality, trendy
            apparel that caters to every individual's unique style. We strive to
            blend comfort, fashion, and sustainability in all our products,
            ensuring that each piece is a reflection of our commitment to the
            planet and our customers.
          </p>
        </div>

        {/* Our Vision */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Our Vision</h3>
          <p className="text-lg">
            We envision a future where fashion is inclusive, sustainable, and
            accessible to all. We aim to lead the industry by embracing
            innovation and pushing the boundaries of what’s possible in fashion
            retail.
          </p>
        </div>
      </div>

      {/* Right Section: Image and Values */}
      <div className="w-full md:w-1/3 flex flex-col items-center">
        <h1 className="text-secondary font-bold text-xl sm:text-2xl">
          TREND <span className="text-primary">TROVE</span>
        </h1>

        <div className="mt-8 text-left space-y-4">
          <h3 className="text-xl font-semibold">Our Core Values</h3>
          <ul className="list-disc ml-6 text-lg space-y-2">
            <li>Innovation</li>
            <li>Customer-Centricity</li>
            <li>Sustainability</li>
            <li>Inclusivity</li>
            <li>Quality Assurance</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
