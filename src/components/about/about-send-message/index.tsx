import { Button, Input, Textarea } from '@nextui-org/react';

const AboutSendMessage = () => {
  return (
    <div className="relative flex w-full flex-col gap-y-5 bg-transparent px-10 xl:flex-row xl:px-0">
      <div className="flex w-full flex-col gap-y-5 rounded-2xl border border-black/10 bg-white px-16 py-10 shadow-outside dark:border-white/20 dark:bg-black/80 dark:shadow-white/15 xl:w-4/5 xl:pl-16 xl:pr-48">
        <p className="text-4xl font-bold uppercase tracking-wide text-yankees-blue dark:text-white">
          SEND ME A MESSAGE
        </p>
        <form className="flex flex-col gap-y-6">
          <div className="flex flex-row gap-x-4">
            <Input isRequired type="string" label="First Name" />
            <Input isRequired type="string" label="Last Name" />
          </div>
          <Input isRequired type="email" label="Email" />
          <Textarea
            label="Message"
            isRequired
            disableAnimation
            disableAutosize
            classNames={{
              input: 'resize-y min-h-40',
            }}
          />
          <div>
            <Button
              className="bg-primary font-semibold uppercase tracking-wide text-white"
              size="lg"
            >
              SEND MESSAGE
            </Button>
          </div>
        </form>
      </div>
      <div className="-right-10 bottom-14 flex w-full flex-col gap-y-3 rounded-2xl border border-black/10 bg-white px-10 py-14 dark:border-white/20 dark:bg-black/80 xl:absolute xl:w-1/3">
        <p className="text-4xl font-bold uppercase tracking-wide text-yankees-blue dark:text-white">
          WORK WITH ME
        </p>
        <p className="text-base font-normal tracking-wide text-yankees-blue dark:text-white/90">
          Hi, thank you for taking the time for my portfolio. If you&apos;re
          looking for a cooperator in your creative idea, feel free to contact
          me.
        </p>
        <p className="text-base font-normal tracking-wide text-gray-400">
          Tel: (+84) 379 991 2701
        </p>
      </div>
    </div>
  );
};
export default AboutSendMessage;
