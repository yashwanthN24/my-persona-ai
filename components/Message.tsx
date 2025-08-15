import React from "react";
import { ChatMessage, Role, Persona } from "../types";
import { PERSONA_CONFIG } from "../constants";
import { FormattedText } from "./FormattedText";

interface MessageProps {
  message: ChatMessage;
  currentPersona: Persona;
}

export const Message: React.FC<MessageProps> = ({
  message,
  currentPersona,
}) => {
  const isUserModel = message.role === Role.Model;
  const personaInfo = PERSONA_CONFIG[currentPersona];

  const wrapperClasses = `flex items-end gap-3 my-4 ${
    !isUserModel && "flex-row-reverse"
  }`;
  const bubbleClasses = `max-w-xl px-4 py-2.5 rounded-2xl shadow-sm ${
    isUserModel
      ? "bg-gray-700 text-gray-100 rounded-bl-none"
      : "bg-indigo-600 text-white rounded-br-none"
  }`;

  const Avatar = () => (
    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-orange-500 text-xl flex-shrink-0">
      {personaInfo.avatar}
    </div>
  );

  return (
    <div className={wrapperClasses}>
      {isUserModel && <Avatar />}
      <div className={bubbleClasses}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          <FormattedText text={message.text} />
        </p>
        {isUserModel && (
          <p className="text-xs text-gray-400 mt-2 text-right">Just now</p>
        )}
      </div>
    </div>
  );
};
