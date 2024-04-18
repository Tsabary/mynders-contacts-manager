function ContactItem({ contact }: { contact: Contact }) {
  return <div className="border-b py-1.5 font-semibold">{contact.name}</div>;
}

export default ContactItem;
