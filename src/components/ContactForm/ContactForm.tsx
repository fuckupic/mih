import React from 'react'

const ContactForm: React.FC = () => {
  return (
    <div className="section !h-min">
      <div className="sectionWrapper flex-col !justify-start flex-1 items-start gap-16">
        <div className="w-[70%] justify-start relative flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="font-campton text-3xl font-semibold text-primary">
              Co se v Plzni vymyslí a vyzkouší, bude fungovat úspěšně i jinde.
            </h2>
            <div className="font-tabletgothic text-xl">
              Spojte se s námi a podílejte se na rozvoji mobility
            </div>
            {/* form with name, email, choose one, additional note */}
          </div>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-tabletgothic text-md">* Jméno</label>
              <input type="text" className="inputField" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-tabletgothic text-md">
                * Emailová adresa
              </label>
              <input type="text" className="inputField" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-tabletgothic text-md">Zajímá mě</label>
              <select
                name="mobility"
                id="mobility"
                className="select inputField"
                required
              >
                <option value="partnership">Partnerství</option>
                <option value="personalMobility">Osobní mobilita</option>
                <option value="mobility">mobility</option>
                <option value="mobility">mobility</option>
                <option value="mobility">mobility</option>
                <option value="mobility">mobility</option>
              </select>
              <div className="flex flex-col gap-2">
                <label className="font-tabletgothic text-md">Poznámka</label>
                <textarea
                  name="note"
                  id="note"
                  className="inputField"
                  rows={4}
                ></textarea>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
