function WeddingPartyCard({ name, bio, image, delay, animation }) {
    return (
        <section className="bg-white/80 p-4 rounded-lg shadow space-y-2 overflow-hidden" 
            data-aos={animation}
            data-aos-delay={delay}
            data-aos-duration="700"
            data-aos-easing="ease-in-out"
            style={{ willChange: 'transform, opacity' }}
        >
            <img 
                loading="lazy"
                src={image}
                alt={name}
                className="w-48 h-48 object-cover mx-auto rounded-full"
            />
            <h4 className="italic font-semibold text-xl pt-2">
                {name}
            </h4>
            <p>
                {bio}
            </p>
        </section>
    );
}

export default WeddingPartyCard;