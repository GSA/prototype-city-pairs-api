
using System;
using System.Text;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace WebApplication.Models
{

	/// <summary>
	/// 
	/// </summary>
	[DataContract]
	public class Airfare
	{
		/// <summary>
		/// Generated unique identifier.
		/// </summary>
		/// <value>Generated unique identifier.</value>
		[DataMember(Name = "ID", EmitDefaultValue = false)]
		[JsonProperty(PropertyName = "ID")]
		public string ID { get; set; }

		/// <summary>
		/// Item number.
		/// </summary>
		/// <value>Item number.</value>
		[DataMember(Name = "ITEM_NUM", EmitDefaultValue = false)]
		[JsonProperty(PropertyName = "ITEM_NUM")]
		public string ITEM_NUM { get; set; }

		/// <summary>
		/// Award Year.
		/// </summary>
		/// <value>Award Year.</value>
		[DataMember(Name = "AWARD_YEAR", EmitDefaultValue = false)]
		[JsonProperty(PropertyName = "AWARD_YEAR")]
		public string AWARD_YEAR { get; set; }

		/// <summary>
		/// Origin Airport Abbreviation.
		/// </summary>
		/// <value>Origin Airport Abbreviation.</value>
		[DataMember(Name = "ORIGIN_AIRPORT_ABBREV", EmitDefaultValue = false)]
		[JsonProperty(PropertyName = "ORIGIN_AIRPORT_ABBREV")]
		public string ORIGIN_AIRPORT_ABBREV { get; set; }

		/// <summary>
		/// Destinatoin Airport Abbreviation.
		/// </summary>
		/// <value>Destinatoin Airport Abbreviation.</value>
		[DataMember(Name = "DESTINATION_AIRPORT_ABBREV", EmitDefaultValue = false)]
		[JsonProperty(PropertyName = "DESTINATION_AIRPORT_ABBREV")]
		public string DESTINATION_AIRPORT_ABBREV { get; set; }

		/// <summary>
		/// Original City Name.
		/// </summary>
		/// <value>Original City Name.</value>
		[DataMember(Name = "ORIGIN_CITY_NAME", EmitDefaultValue = false)]
		[JsonProperty(PropertyName = "ORIGIN_CITY_NAME")]
		public string ORIGIN_CITY_NAME { get; set; }

		/// <summary>
		/// Origin State.
		/// </summary>
		/// <value>Origin State.</value>
		[DataMember(Name = "ORIGIN_STATE", EmitDefaultValue = false)]
		[JsonProperty(PropertyName = "ORIGIN_STATE")]
		public string ORIGIN_STATE { get; set; }

		/// <summary>
		/// Origin Country.
		/// </summary>
		/// <value>Origin Country.</value>
		[DataMember(Name = "ORIGIN_COUNTRY", EmitDefaultValue = false)]
		[JsonProperty(PropertyName = "ORIGIN_COUNTRY")]
		public string ORIGIN_COUNTRY { get; set; }

		/// <summary>
		/// Destination City Name.
		/// </summary>
		/// <value>Destination City Name.</value>
		[DataMember(Name = "DESTINATION_CITY_NAME", EmitDefaultValue = false)]
		[JsonProperty(PropertyName = "DESTINATION_CITY_NAME")]
		public string DESTINATION_CITY_NAME { get; set; }

		/// <summary>
		/// Destination State.
		/// </summary>
		/// <value>Destination State.</value>
		[DataMember(Name = "DESTINATION_STATE", EmitDefaultValue = false)]
		[JsonProperty(PropertyName = "DESTINATION_STATE")]
		public string DESTINATION_STATE { get; set; }

		/// <summary>
		/// Destination Country.
		/// </summary>
		/// <value>Destination Country.</value>
		[DataMember(Name = "DESTINATION_COUNTRY", EmitDefaultValue = false)]
		[JsonProperty(PropertyName = "DESTINATION_COUNTRY")]
		public string DESTINATION_COUNTRY { get; set; }

		/// <summary>
		/// Airline Abbreviation.
		/// </summary>
		/// <value>Airline Abbreviation.</value>
		[DataMember(Name = "AIRLINE_ABBREV", EmitDefaultValue = false)]
		[JsonProperty(PropertyName = "AIRLINE_ABBREV")]
		public string AIRLINE_ABBREV { get; set; }

		/// <summary>
		/// Awarded Serv.
		/// </summary>
		/// <value>Awarded Serv.</value>
		[DataMember(Name = "AWARDED_SERV", EmitDefaultValue = false)]
		[JsonProperty(PropertyName = "AWARDED_SERV")]
		public string AWARDED_SERV { get; set; }

		/// <summary>
		/// PAX Count.
		/// </summary>
		/// <value>PAX Count.</value>
		[DataMember(Name = "PAX_COUNT", EmitDefaultValue = false)]
		[JsonProperty(PropertyName = "PAX_COUNT")]
		public string PAX_COUNT { get; set; }

		/// <summary>
		/// YCA Fare.
		/// </summary>
		/// <value>YCA Fare.</value>
		[DataMember(Name = "YCA_FARE", EmitDefaultValue = false)]
		[JsonProperty(PropertyName = "YCA_FARE")]
		public string YCA_FARE { get; set; }

		/// <summary>
		/// XCA Fare.
		/// </summary>
		/// <value>XCA Fare.</value>
		[DataMember(Name = "XCA_FARE", EmitDefaultValue = false)]
		[JsonProperty(PropertyName = "XCA_FARE")]
		public string XCA_FARE { get; set; }

		/// <summary>
		/// Business Fare.
		/// </summary>
		/// <value>Business Fare.</value>
		[DataMember(Name = "BUSINESS_FARE", EmitDefaultValue = false)]
		[JsonProperty(PropertyName = "BUSINESS_FARE")]
		public string BUSINESS_FARE { get; set; }

		/// <summary>
		/// Origin Airport Location.
		/// </summary>
		/// <value>Origin Airport Location.</value>
		[DataMember(Name = "ORIGIN_AIRPORT_LOCATION", EmitDefaultValue = false)]
		[JsonProperty(PropertyName = "ORIGIN_AIRPORT_LOCATION")]
		public string ORIGIN_AIRPORT_LOCATION { get; set; }

		/// <summary>
		/// Destination Airport Location.
		/// </summary>
		/// <value>Destination Airport Location.</value>
		[DataMember(Name = "DESTINATION_AIRPORT_LOCATION", EmitDefaultValue = false)]
		[JsonProperty(PropertyName = "DESTINATION_AIRPORT_LOCATION")]
		public string DESTINATION_AIRPORT_LOCATION { get; set; }

		/// <summary>
		/// Origin City State Airport.
		/// </summary>
		/// <value>Origin City State Airport.</value>
		[DataMember(Name = "ORIGIN_CITY_STATE_AIRPORT", EmitDefaultValue = false)]
		[JsonProperty(PropertyName = "ORIGIN_CITY_STATE_AIRPORT")]
		public string ORIGIN_CITY_STATE_AIRPORT { get; set; }

		/// <summary>
		/// Destination City State Airport.
		/// </summary>
		/// <value>Destination City State Airport.</value>
		[DataMember(Name = "DESTINATION_CITY_STATE_AIRPORT", EmitDefaultValue = false)]
		[JsonProperty(PropertyName = "DESTINATION_CITY_STATE_AIRPORT")]
		public string DESTINATION_CITY_STATE_AIRPORT { get; set; }

		/// <summary>
		/// Expiration Date.
		/// </summary>
		/// <value>Expiration Date.</value>
		[DataMember(Name = "EFFECTIVE_DATE", EmitDefaultValue = false)]
		[JsonProperty(PropertyName = "EFFECTIVE_DATE")]
		public DateTime EFFECTIVE_DATE { get; set; }

		/// <summary>
		/// Expiration Date.
		/// </summary>
		/// <value>Expiration Date.</value>
		[DataMember(Name = "EXPIRATION_DATE", EmitDefaultValue = false)]
		[JsonProperty(PropertyName = "EXPIRATION_DATE")]
		public DateTime EXPIRATION_DATE { get; set; }


		/// <summary>
		/// Get the string presentation of the object
		/// </summary>
		/// <returns>String presentation of the object</returns>
		public override string ToString()
		{
			var sb = new StringBuilder();
			sb.Append("class Airfare {\n");
			sb.Append("  ID: ").Append(ID).Append("\n");
			sb.Append("  ITEM_NUM: ").Append(ITEM_NUM).Append("\n");
			sb.Append("  AWARD_YEAR: ").Append(AWARD_YEAR).Append("\n");
			sb.Append("  ORIGIN_AIRPORT_ABBREV: ").Append(ORIGIN_AIRPORT_ABBREV).Append("\n");
			sb.Append("  DESTINATION_AIRPORT_ABBREV: ").Append(DESTINATION_AIRPORT_ABBREV).Append("\n");
			sb.Append("  ORIGIN_CITY_NAME: ").Append(ORIGIN_CITY_NAME).Append("\n");
			sb.Append("  ORIGIN_STATE: ").Append(ORIGIN_STATE).Append("\n");
			sb.Append("  ORIGIN_COUNTRY: ").Append(ORIGIN_COUNTRY).Append("\n");
			sb.Append("  DESTINATION_CITY_NAME: ").Append(DESTINATION_CITY_NAME).Append("\n");
			sb.Append("  DESTINATION_STATE: ").Append(DESTINATION_STATE).Append("\n");
			sb.Append("  DESTINATION_COUNTRY: ").Append(DESTINATION_COUNTRY).Append("\n");
			sb.Append("  AIRLINE_ABBREV: ").Append(AIRLINE_ABBREV).Append("\n");
			sb.Append("  AWARDED_SERV: ").Append(AWARDED_SERV).Append("\n");
			sb.Append("  PAX_COUNT: ").Append(PAX_COUNT).Append("\n");
			sb.Append("  YCA_FARE: ").Append(YCA_FARE).Append("\n");
			sb.Append("  XCA_FARE: ").Append(XCA_FARE).Append("\n");
			sb.Append("  BUSINESS_FARE: ").Append(BUSINESS_FARE).Append("\n");
			sb.Append("  ORIGIN_AIRPORT_LOCATION: ").Append(ORIGIN_AIRPORT_LOCATION).Append("\n");
			sb.Append("  DESTINATION_AIRPORT_LOCATION: ").Append(DESTINATION_AIRPORT_LOCATION).Append("\n");
			sb.Append("  ORIGIN_CITY_STATE_AIRPORT: ").Append(ORIGIN_CITY_STATE_AIRPORT).Append("\n");
			sb.Append("  DESTINATION_CITY_STATE_AIRPORT: ").Append(DESTINATION_CITY_STATE_AIRPORT).Append("\n");
			sb.Append("  EFFECTIVE_DATE: ").Append(EFFECTIVE_DATE).Append("\n");
			sb.Append("  EXPIRATION_DATE: ").Append(EXPIRATION_DATE).Append("\n");
			sb.Append("}\n");
			return sb.ToString();
		}

		/// <summary>
		/// Get the JSON string presentation of the object
		/// </summary>
		/// <returns>JSON string presentation of the object</returns>
		public string ToJson()
		{
			return JsonConvert.SerializeObject(this, Formatting.Indented);
		}

	}
}
