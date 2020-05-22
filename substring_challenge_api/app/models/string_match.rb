class StringMatch < ApplicationRecord
  belongs_to :user
  before_save :set_attributes

  def set_attributes
    substring = StringCalService.call(first_string)
                                .non_continous_substr?(second_string)
    self.result = substring[:result]
    self.matched_letters = substring[:matched_letters]
  end
end
