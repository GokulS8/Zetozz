export default function Banner() {
    return (
        <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen overflow-hidden">
            
            <img
                src="/D-tanBanner.png"
                alt="D-tan Banner"
                className="w-full h-full object-cover object-center"
            />

             
            <div className="absolute inset-0 bg-black/10"></div> 
           

        </section>
    );
}