export default function Map() {
    return (
      <div className="w-full h-96 bg-gray-100">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.2084673048272!2d36.8328753!3d-1.2103907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3d19d9773081%3A0xada6fc77c52483a0!2sKFC%20Kiambu%20Rd!5e0!3m2!1sen!2ske!4v1672634650312!5m2!1sen!2ske"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    );
  }
  