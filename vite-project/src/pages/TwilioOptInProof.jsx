import { Link } from 'react-router-dom';
import { FaCheckCircle, FaPhone, FaUser } from 'react-icons/fa';

export default function TwilioOptInProof() {
    return (
        <section className="relative min-h-screen bg-white pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-gray-800">
            <img
                src="/images/bg-pastel.png"
                className="absolute inset-0 w-full h-full object-cover opacity-40 z-0"
                alt=""
            />

            <div className="relative z-10 max-w-3xl mx-auto bg-white/90 backdrop-blur-md border border-mauve/20 rounded-2xl shadow-lg p-8 md:p-10">
                <p className="text-xs uppercase tracking-[0.25em] text-rust font-semibold text-center mb-3">
                    Twilio Review Only
                </p>
                <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-mauve text-center mb-4">
                    SMS Opt-In Proof
                </h1>
                <p className="text-sm md:text-base leading-relaxed text-center mb-8">
                    This public page demonstrates the optional SMS consent language shown to invited guests after
                    they verify their name on the private RSVP form. It is non-functional and does not submit RSVPs,
                    collect phone numbers, or expose the private guest list.
                </p>

                <div className="rounded-xl border border-mauve/20 bg-white/80 p-6 shadow-sm space-y-6">
                    <div>
                        <label htmlFor="review-name" className="text-left block text-sm font-medium text-gray-700 mb-1 italic">
                        <FaUser className="inline mr-2 text-mauve" />
                            Full Name
                        </label>

                        <input
                            id="review-name"
                            type="text"
                            value="Twilio Reviewer"
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                        />
                    </div>

                    <div>
                        <label htmlFor="review-phone" className="block text-sm font-medium text-gray-700 mb-1 italic">
                            <FaPhone className="inline mr-2 text-mauve" />
                            Phone Number
                        </label>

                        <input
                        id="review-phone"
                        type="tel"
                        value="(555) 123 - 4567"
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                        />
                    </div>

                    <div className="rounded-md border border-mauve/20 bg-white/70 p-4 text-sm text-gray-700">
                        <label className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                name="smsConsentReview"
                                className="mt-1 accent-rust"
                                aria-label="Optional SMS consent checkbox demonstration"
                            />
                            <span>
                                Yes, I agree to receive text messages from Fernando and Breanna Wedding about my RSVP,
                                wedding reminders, event updates, and logistics at the mobile number provided.
                            </span>
                        </label>

                        <p className="mt-2 text-xs leading-relaxed text-gray-600">
                            Message frequency varies. Message and data rates may apply. Reply STOP to unsubscribe or HELP
                            for help. SMS consent is optional and is not required to submit your RSVP.{' '}
                            <Link to="/privacy" className="font-semibold text-rust underline">
                                Privacy Policy
                            </Link>
                            {' '}|{' '}
                            <Link to="/terms" className="font-semibold text-rust underline">
                                Terms of Service
                            </Link>
                        </p>
                    </div>

                    <div className="rounded-md border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                        <FaCheckCircle className="inline mr-2" />
                        The checkbox above is blank by default. Guests only receive SMS messages when they voluntarily
                        check it before submitting the RSVP form.
                    </div>
                </div>
            </div>
        </section>
    );
}
