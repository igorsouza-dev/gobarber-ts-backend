import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const router = Router();
interface Appointment {
  id: string;
  provider: string;
  date: Date;
}
const appointments: Appointment[] = [];

router.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentsInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  if (findAppointmentsInSameDate) {
    return response
      .status(400)
      .json({ message: 'There is another appointment booked at this time' });
  }

  const appointment = {
    uuid: uuid(),
    provider,
    date: parsedDate,
  };
  appointments.push(appointment);
  return response.json(appointment);
});

export default router;
