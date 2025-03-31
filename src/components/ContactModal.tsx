import React, { useState } from 'react';
import { Button, Modal, Label, TextInput, Textarea } from 'flowbite-react';
import { FaWhatsapp } from 'react-icons/fa';

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
  actionType: 'test-drive' | 'make-offer' | 'call-back';
  vehicleTitle?: string;
};

const ContactModal = ({ isOpen, onClose, actionType, vehicleTitle }: ContactModalProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  
  // Title and default messages based on action type
  const titles = {
    'test-drive': 'Book a Test Drive',
    'make-offer': 'Make an Offer',
    'call-back': 'Request a Call Back'
  };
  
  const defaultMessages = {
    'test-drive': `Hello, I would like to book a test drive for ${vehicleTitle || 'this vehicle'}.`,
    'make-offer': `Hello, I would like to make an offer for ${vehicleTitle || 'this vehicle'}.`,
    'call-back': `Hello, I'm interested in ${vehicleTitle || 'this vehicle'}. Please call me back.`
  };
  
  // Set default message when modal opens or action type changes
  React.useEffect(() => {
    if (isOpen) {
      setMessage(defaultMessages[actionType]);
    }
  }, [isOpen, actionType, vehicleTitle]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the WhatsApp message
    const whatsappMessage = encodeURIComponent(
      `*${titles[actionType]}*\n\nName: ${name}\nPhone: ${phone}\n\n${message}`
    );
    
    // Open WhatsApp with pre-filled message
    window.open(`https://api.whatsapp.com/send?phone=254792254254&text=${whatsappMessage}`, '_blank');
    
    // Close the modal and reset form
    onClose();
    setName('');
    setPhone('');
    setMessage(defaultMessages[actionType]);
  };
  
  return (
    <Modal show={isOpen} onClose={onClose} size="md">
      <Modal.Header className="bg-white">
        {titles[actionType]}
      </Modal.Header>
      <Modal.Body className="bg-white">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" value="Your Name" />
            <TextInput
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="John Doe"
            />
          </div>
          <div>
            <Label htmlFor="phone" value="Your Phone Number" />
            <TextInput
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="+2547XXXXXXXX"
            />
          </div>
          <div>
            <Label htmlFor="message" value="Message" />
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button color="gray" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" color="success" className="flex items-center gap-2">
              <FaWhatsapp />
              Send WhatsApp
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ContactModal;