import { FaUser, FaPhone, FaHome, FaCheckCircle, FaTimesCircle, FaUtensils, FaIdBadge } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLanguage } from '../context/LanguageContext';

export default function RSVP() {
    const { language } = useLanguage();
    const rsvpText = {
      en: {
        title: "RSVP",
        fullName: "Full Name",
        enterName: "Enter your full name",
        nameValidation: "Guest not found on the list",
        checkRsvp: "Check RSVP",
        errorNameReq: "Name is required",
        phone: "Phone Number",
        phoneValidation: "Please enter a valid U.S. phone number.",
        attendance: "Will you be attending?",
        yes: "Yes",
        dinner: "Will you be attending Dinner?",
        submit: "Submit RSVP",
        party: "People in your party:",
        name: "Name",
        partyAttendance: "Attending",
        partyDinner: "Dinner",
        success: {
          RSVP_SUCCESS: "",
          GUEST_NAME_FOUND: "Guest name found!",
        },
        errors: {
          NAME_REQUIRED: "Name is required",
          MISSING_FIELDS: "Name, Phone, and Attendance are required",
          PHONE_INVALID: "Please enter a valid U.S. phone number.",
          GUEST_NOT_FOUND: "Guest not found on the list.",
          GUEST_NOT_FOUND_DB: "Guest not found in the database.",
          INDIVIDUAL_INVALID: "Individual attendance data is missing or invalid.",
          ATTENDING_INVALID: "Attendance must be marked as yes or no.",
          DINNER_INVALID: "Dinner choice is invalid based on your attendance selection.",
          PARTY_INCOMPLETE: "Each guest in your party must have a yes or no attendance selection.",
          RSVP_SAVE_FAILED: "We were unable to save your RSVP. Please try again.",
          DINNER_REQUIRED: "Please select a dinner option.",
          PARTY_SELECTION_REQUIRED: "Please select attendance for everyone in your party.",
          SERVER_ERROR: "Server error. Please try again later.",
        },
      },
      es: {
        title: "RSVP",
        fullName: "Nombre Completo",
        enterName: "Ingresa tu nombre completo",
        nameValidation: "Invitado no encontrado en la lista",
        checkRsvp: "Verificar RSVP",
        errorNameReq: "El nombre es obligatorio",
        phone: "Número de Teléfono",
        phoneValidation: "Por favor ingresa un número de teléfono válido de EE. UU.",
        attendance: "¿Asistirás?",
        yes: "Sí",
        dinner: "¿Asistirás a la cena?",
        submit: "Enviar RSVP",
        party: "Personas en tu grupo:",
        name: "Nombre",
        partyAttendance: "Asistirá",
        partyDinner: "Cena",
        success: {
          RSVP_SUCCESS: "Thank you for your RSVP!",
          GUEST_NAME_FOUND: "¡Invitado encontrado!",
        },
        errors: {
          NAME_REQUIRED: "El nombre es obligatorio",
          MISSING_FIELDS: "El nombre, teléfono y asistencia son obligatorios",
          PHONE_INVALID: "Por favor ingresa un número de teléfono válido de EE. UU.",
          GUEST_NOT_FOUND: "Invitado no encontrado en la lista.",
          GUEST_NOT_FOUND_DB: "El invitado no se encuentra en la base de datos.",
          INDIVIDUAL_INVALID: "La información de asistencia individual falta o no es válida.",
          ATTENDING_INVALID: "La asistencia debe marcarse como sí o no.",
          DINNER_INVALID: "La opción de cena no es válida según tu selección de asistencia.",
          PARTY_INCOMPLETE: "Cada invitado de tu grupo debe tener una selección de asistencia de sí o no.",
          RSVP_SAVE_FAILED: "No pudimos guardar tu RSVP. Por favor inténtalo de nuevo.",
          DINNER_REQUIRED: "Por favor selecciona una opción de cena.",
          PARTY_SELECTION_REQUIRED: "Por favor selecciona la asistencia de cada invitado en tu grupo.",
          SERVER_ERROR: "Error del servidor. Por favor inténtalo de nuevo más tarde.",
        }
      },
      
    }
    
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [attending, setAttending] = useState('');
    const [message, setMessage] = useState('');
    const [lookupName, setLookupName] = useState('');
    const [household, setHousehold] = useState([]);
    const [nameError, setNameError] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [individualAttendance, setIndividualAttendance] = useState({});
    const [dinner, setDinner] = useState('');
    const [isChecking, setIsChecking] = useState(false);

    const attendanceRef = useRef(null);
    const navigate = useNavigate();
    
    const nameInputRef = useRef(null);
    useEffect(() => {
      if (!isVerified && nameInputRef.current) {
        nameInputRef.current.focus();
      }
    }, [isVerified]);
    
    //Enforcing U.S phone format
    const normalizePhone = (input) => {
      const digits = input.replace(/\D/g, '');

      //NANP rule for valid Area Codes
      if (digits.length >= 3 && !/^[2-9]/.test(digits[0])) {
        return null;
      }
      
      if (digits.length === 10) {
        return `+1${digits}`;
      }

      if (digits.length === 11 && digits.startsWith('1')) {
        return `+${digits}`;
      }

      return null;
    };
    
    const isPhoneValid = (input) => normalizePhone(input) !== null;
    
    useEffect(() => {
      console.log("Updated individualAttendance:", individualAttendance);
    }, [individualAttendance]);

    
    //Check Guest list for valid guest RSVP
    const checkName = async () => {
      if (isChecking) return;
      setIsChecking(true);
      
      const API_URL = import.meta.env.VITE_API_URL;

      console.log("VITE_API_URL =", API_URL);

      if (!API_URL) {
        alert("VITE_API_URL is missing (undefined). Restart Vite and confirm .env location.");
        return;
      }
      
      try {
        const res = await fetch(`${API_URL}/api/guest-check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: lookupName }),
        });

        const text = await res.text();
        console.log("guest-check status:", res.status);
        console.log("guest-check response text:", text);

        let data;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error("Response was not JSON");
        }

        const key = data.error;
        const message = rsvpText[language].errors[key] || "An Error has occured";

        if (!res.ok) {
          toast.dismiss();
          toast.error(message);
          setIsVerified(false);
          setNameError(message);
          setHousehold([]);
          return;
        }

        toast.success(rsvpText[language].success.GUEST_NAME_FOUND);
        setIsVerified(true);
        setNameError('');

        const isSoloGuest = data.guests.length === 0;

        if(isSoloGuest) {
          setHousehold([]);
          setIndividualAttendance({});
        } else {
          setHousehold(data.guests);
          
          const attendanceObj = {};
          data.guests
            .filter(g => g.toLowerCase() !== lookupName.toLowerCase())
            .forEach(g => {
              attendanceObj[g] = { rsvp: '', dinner: '' };
            });

            setIndividualAttendance(attendanceObj);
        }

        // Prefill existing RSVP data
        if (data.existing) {
          setPhone(formatPhoneInput(data.existing.phone?.replace('+1', '') || ''));
          setAttending(data.existing.attending ? 'yes' : 'no');
          setDinner(data.existing.dinner ? 'yes' : 'no');

          if (data.existing.individualAttendance) {
            setIndividualAttendance(data.existing.individualAttendance);
            setHousehold(Object.keys(data.existing.individualAttendance));

          }

        }
      } catch (err) {
        console.error(err);
        toast.dismiss();
        toast.error(rsvpText[language].errors.SERVER_ERROR);
        setNameError(rsvpText[language].errors.SERVER_ERROR);
        setHousehold([]);
        setIsVerified(false);
      } finally {
        setIsChecking(false);
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (attending === 'yes' && (dinner !== 'yes' && dinner !== 'no')) {
        setMessage(rsvpText[language].errors.DINNER_REQUIRED);
        return;
      }

      //Check that every household member has an RSVP selected
      const allSelected = Object.values(individualAttendance).every(
        (val) => {
          if (val.rsvp !== 'yes' && val.rsvp !== 'no') {
            return false;
          }
          
          if (val.rsvp === 'yes') {
            return val.dinner === 'yes' || val.dinner === 'no';
          }

          return true;
      });

      console.log("Validating individualAttendance:", individualAttendance);


      if(!allSelected) {
        setMessage(rsvpText[language].errors.PARTY_SELECTION_REQUIRED);
        return;
      }
      
      try {
        const normalizedPhone = normalizePhone(phone);

        if (!normalizedPhone) {
          setPhoneError(rsvpText[language].phoneValidation);
          return;
        } else {
          setPhoneError('');
        }
        
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/rsvp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name.trim(), phone: normalizedPhone, attending, dinner, individualAttendance })
        });

        const data = await res.json();

        if (res.ok) {
          setMessage(rsvpText[language].success.RSVP_SUCCESS);
          setName('');
          setPhone('');
          setAttending('');
          setDinner('');
          setHousehold([]);
          setIndividualAttendance({});
          setIsVerified(false);
          setLookupName('');
          setNameError('');
          setMessage('');
          navigate('/confirmation');
        } else {
          setMessage(data.error || 'Something went wrong.');
        }
      } catch (err) {
        console.error(err);
        setMessage(rsvpText[language].errors.SERVER_ERROR);
      }
    };

    const formatPhoneInput = (value) => {
      const digits = value.replace(/\D/g, '').substring(0, 10); //10 digit limit

      const area = digits.substring(0, 3);
      const prefix = digits.substring(3, 6);
      const line = digits.substring(6,10);

      if (digits.length > 6) {
        return `(${area}) ${prefix} - ${line}`;
      } else if (digits.length > 3) {
        return `(${area}) ${prefix}`;
      } else if (digits.length > 0) {
        return `(${area}`;
      }

      return '';
    };
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <section className="relative min-h-screen bg-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <img
            src='/images/bg-pastel.png'
            className='absolute inset-0 w-full h-full object-cover opacity-40 z-0'
          />
          <div className="relative max-w-2xl mx-auto bg/white/90 backdrop-blur-md border border-mauve/20 rounded-2xl shadow-lg p-10 z-10 ">
            <h2 className="text-3xl font-bold tracking-wide text-mauve text-center mb-6"
                data-aos="fade-down"
            >
              {rsvpText[language].title}
            </h2>
        
            {/* RSVP Form */}
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Full Name */}
              <div className="mb-4 text-center" data-aos="fade-up" data-aos-delay="200" data-aos-once="true">
                <label htmlFor="name" className="text-left block text-sm font-medium text-gray-700 mb-1 italic">
                  <FaUser className='inline mr-2 text-mauve'/>
                  {rsvpText[language].fullName}
                </label>
                <input
                  ref={nameInputRef}
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setLookupName(e.target.value);
                  }}
                  className="input-class-name w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-peach focus:border-peach"
                  placeholder={rsvpText[language].enterName}
                  required
                />
                {!isVerified && (
                  <button
                    type='button'
                    className='mt-2 bg-peach text-white px-4 py-2 rounded-md hover:bg-peach/80 transition'
                    onClick={checkName}
                  >
                    {rsvpText[language].checkRsvp}
                  </button>
                )}
                
              </div>

              { isVerified && (
                //Phone Number
                <div className="mb-4" data-aos="fade-up" data-aos-delay="300" data-aos-once="true">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 italic">
                    <FaPhone className='inline mr-2 text-mauve'/>
                    {rsvpText[language].phone}
                  </label>

                  <div className='relative'>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      inputMode="tel"
                      autoComplete='tel'
                      value={phone}
                      onChange={(e) => {
                        const formatted = formatPhoneInput(e.target.value);
                        setPhone(formatted);
                        const digits = formatted.replace(/\D/g, '');
                        if (digits.length === 10 && attendanceRef.current) {
                          attendanceRef.current.focus();
                        }
                      }}
                      onPaste={(e) => {
                        e.preventDefault();
                        const pasted = e.clipboardData.getData('text');
                        const digits = pasted.replace(/\D/g, '');
                        const formatted = formatPhoneInput(digits);
                        setPhone(formatted);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-peach focus:border-peach"
                      required
                    />
                    {phone && (
                      <div 
                          className="absolute inset-y-0 right-3 flex items-center text-lg pointer-events-none"
                          data-aos="fade-zoom-in"
                          data-aos-easing="ease-in-out"
                          data-aos-delay="100"
                          data-aos-duration="300"
                          data-aos-once="true"
                          key={isPhoneValid(phone) ? 'valid' : 'invalid'}
                        >
                        {isPhoneValid(phone) ? (
                          <FaCheckCircle className="text-green-500" />
                        ) : (
                          <FaTimesCircle className="text-red-500" />
                        )}
                      </div>
                    )}
                  </div>

                  {phoneError && (
                    <p className='text-red-500 text-sm mt-2'>{phoneError}</p>
                  )}
                </div>
              )}
              
              {isVerified && (
                //Attendance
                <div className="mb-4" data-aos="fade-up" data-aos-delay="400" data-aos-once="true">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaCheckCircle className='inline mr-2 text-mauve' />
                    {rsvpText[language].attendance}
                  </label>

                  <div className="flex flex-col sm:flex-row sm:space-x-6 ">
                    <label className="inline-flex items-center mb-2 sm:mb-0">
                      <input 
                        type="radio" 
                        name="attendance" 
                        value="yes" 
                        ref={attendanceRef}
                        onChange={(e) => setAttending(e.target.value)}
                        className="mr-2 accent-rust" 
                        required 
                      />
                        {rsvpText[language].yes}
                    </label>

                    <label className="inline-flex items-center">
                      <input 
                        type="radio" 
                        name="attendance" 
                        value="no" 
                        onChange={(e) => setAttending(e.target.value)}
                        className="mr-2 accent-rust" 
                        required
                      />
                        No
                    </label>
                  </div>
                </div>
              )}

              {/* Dinner Attendance */}
              {attending === 'yes' && (
                <div className='mb-4'>
                  <label className='text-sm block font-medium text-gray-700 mb-2' data-aos="fade-up" data-aos-delay="500">
                    <FaUtensils className='inline-flex mr-2 text-mauve'/>
                    {rsvpText[language].dinner}
                    <span className='text-sm text-gray-500'> (5:30pm - 7pm)</span>
                  </label>

                  <div className='flex flex-col md:flex-row sm:flex-row sm:space-x-6' data-aos="fade-up" data-aos-delay>
                    <label className='inline-flex items-center mb-2 sm:mb-0'>
                      <input 
                        type='radio'
                        name='dinner'
                        value='yes'
                        checked={dinner === 'yes'}
                        onChange={(e) => setDinner(e.target.value)}
                        className='mr-2'
                        required
                      />
                      {rsvpText[language].yes}
                      
                    </label>

                    <label className='inline-flex items-center'>
                      <input 
                        type='radio'
                        name='dinner'
                        value='no'
                        checked={dinner === 'no'}
                        onChange={(e) => setDinner(e.target.value)}
                        className='mr-2'
                      />
                      No
                    </label>
                  </div>
                </div>
              )}
        
              {nameError && (
                <p className='text-red-500 text-sm mt-4'>
                  {nameError}
                </p>
              )}

              {/* Display attendance options for the guest's household */}
              {household.length > 0 && (
                <div className='mt-6 text-left' data-aos="fade-up" data-aos-delay="600">
                  <h3 className='text-lg font-semibold text-mauve mb-2'>
                    {rsvpText[language].party}
                  </h3>
                  <div className='flex items-center justify-between space-x-4 mb-3 border-b border-rust/30 pb-1'>
                    <span className='flex items-center gap-1 w-[120px] max-w-[150px] text-[13px] text-rust font-medium italic tracking-wide'>
                      <FaIdBadge className='text-[10px]' />
                      {rsvpText[language].name}
                    </span>
                    <span className='flex items-center gap-1 w-[140px] text-sm text-[13px] text-rust font-medium italic tracking-wide'>
                      <FaCheckCircle className='text-[10px]' />
                      {rsvpText[language].partyAttendance}
                    </span>
                    <span className='flex items-center gap-1 w-[140px] text-sm text-[13px] text-rust font-medium italic tracking-wide'>
                      <FaUtensils className='text-[10px]' />
                      {rsvpText[language].partyDinner}
                    </span>
                  </div>
                  <ul className='space-y-3'>
                    {household
                      .filter(g => g.toLowerCase() !== name.toLowerCase())
                      .map((guest, i) => (
                        <li key={i} className='flex items-center justify-between space-x-4 bg-white/60 p-3 rounded-md shadow-sm border border-mauve/10'>
                          {/*Household Names */}
                          <span className='w-[120px] max-w-[150px] text-left text-sm leading-snug break-words font-medium text-gray-800'>
                            {guest}
                          </span>

                          {/* Household RSVP Radios*/}
                          <div className='flex space-x-4 items-center w-[140px]'>
                            <label className='inline-flex items-center'>
                              <input 
                                className="accent-rust"
                                type="radio"
                                name={`rsvp-${guest}`}
                                value="yes"
                                checked={individualAttendance[guest]?.rsvp === 'yes'}
                                onChange={(e) => 
                                  setIndividualAttendance((prev) => ({
                                    ...prev,
                                    [guest]: {
                                      ...prev[guest],
                                      rsvp: e.target.value,
                                    },
                                  }))
                                }
                              />
                              <span className='ml-1'>{rsvpText[language].yes}</span>
                            </label>

                            <label className='inline-flex items-center'>
                              <input 
                                className="accent-rust"
                                type="radio"
                                name={`rsvp-${guest}`}
                                value="no"
                                checked={individualAttendance[guest]?.rsvp === 'no'}
                                onChange={(e) => 
                                  setIndividualAttendance((prev) => ({
                                    ...prev,
                                    [guest]: {
                                      ...prev[guest],
                                      rsvp: e.target.value,
                                    },
                                  }))
                                }
                              />
                              <span className='ml-1'>No</span>
                            </label>
                          </div>

                        {/* Household Dinner Radios */}
                        <div className='flex space-x-4 items-center w-[140px]'>
                          {individualAttendance[guest]?.rsvp === 'yes' ? (
                            <>
                              <label className='inline-flex items-center'>
                                <input
                                  className="accent-rust"
                                  type="radio"
                                  name={`dinner-${guest}`}
                                  value="yes"
                                  checked={individualAttendance[guest]?.dinner === 'yes'}
                                  onChange={(e) =>
                                    setIndividualAttendance((prev) => ({
                                      ...prev,
                                      [guest]: {
                                        ...prev[guest],
                                        dinner: e.target.value,
                                      },
                                    }))
                                  }
                                />
                                <span className="ml-1">{rsvpText[language].yes}</span>
                              </label>
                              <label className='inline-flex items-center'>
                                <input
                                  className="accent-rust"
                                  type="radio"
                                  name={`dinner-${guest}`}
                                  value="no"
                                  checked={individualAttendance[guest]?.dinner === 'no'}
                                  onChange={(e) =>
                                    setIndividualAttendance((prev) => ({
                                      ...prev,
                                      [guest]: {
                                        ...prev[guest],
                                        dinner: e.target.value,
                                      },
                                    }))
                                  }
                                />
                                <span className="ml-1">No</span>
                              </label>
                            </>
                          ) : null}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
        
              {isVerified && (
                //Submit Button
                <div className="text-center" data-aos="fade-up" data-aos-delay="700" data-aos-once="true">
                  <button
                    type="submit"
                    className="bg-peach hover:bg-peach/80 text-white font-semibold py-2 px-6 rounded-md transition-colors"
                    disabled={!isVerified}
                  >
                    {rsvpText[language].submit}
                  </button>
                  {message && (
                    <p className='mt-4 text-peach font-medium text-center'>
                      {message}
                    </p>
                  )}
                </div>
              )}
            </form>
        
          </div>
        </section>
      </motion.div>
    );
  }
  